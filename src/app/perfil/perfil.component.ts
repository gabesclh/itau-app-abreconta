import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioModel } from './model/usuario.model';
import { PerfilService } from './service/perfil.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  estados = [
    { "nome": "Acre", "sigla": "AC" },
    { "nome": "Alagoas", "sigla": "AL" },
    { "nome": "Amapá", "sigla": "AP" },
    { "nome": "Amazonas", "sigla": "AM" },
    { "nome": "Bahia", "sigla": "BA" },
    { "nome": "Ceará", "sigla": "CE" },
    { "nome": "Distrito Federal", "sigla": "DF" },
    { "nome": "Espírito Santo", "sigla": "ES" },
    { "nome": "Goiás", "sigla": "GO" },
    { "nome": "Maranhão", "sigla": "MA" },
    { "nome": "Mato Grosso", "sigla": "MT" },
    { "nome": "Mato Grosso do Sul", "sigla": "MS" },
    { "nome": "Minas Gerais", "sigla": "MG" },
    { "nome": "Pará", "sigla": "PA" },
    { "nome": "Paraíba", "sigla": "PB" },
    { "nome": "Paraná", "sigla": "PR" },
    { "nome": "Pernambuco", "sigla": "PE" },
    { "nome": "Piauí", "sigla": "PI" },
    { "nome": "Rio de Janeiro", "sigla": "RJ" },
    { "nome": "Rio Grande do Norte", "sigla": "RN" },
    { "nome": "Rio Grande do Sul", "sigla": "RS" },
    { "nome": "Rondônia", "sigla": "RO" },
    { "nome": "Roraima", "sigla": "RR" },
    { "nome": "Santa Catarina", "sigla": "SC" },
    { "nome": "São Paulo", "sigla": "SP" },
    { "nome": "Sergipe", "sigla": "SE" },
    { "nome": "Tocantins", "sigla": "TO" }
  ];

  usuario = new UsuarioModel();
  userForm: FormGroup;
  cpfForm: FormGroup;
  showForm = false;
  newUser = false;
  signupOk = false;
  enableSubmit = false;
  hide = true;
  step = 0;

  constructor(
    private readonly snackBar: MatSnackBar,
    public service: PerfilService,
  ) { }

  ngOnInit(): void {
    this.montarFormularioCPF();
  }

  private montarFormularioCPF() {
    this.cpfForm = new FormGroup({
      cpf: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(11)]),
    });
  }

  private montarFormularioUsuario(userTemp?: UsuarioModel) {
    this.userForm = new FormGroup({
      email: new FormControl({ value: (userTemp ? userTemp.email : ''), disabled: true }, [Validators.required, Validators.email]),
      nome: new FormControl({ value: (userTemp ? userTemp.nome : ''), disabled: true }, [Validators.required]),
      cpf: new FormControl({ value: (userTemp ? userTemp.cpf : ''), disabled: true }, [Validators.required]),
      telefone: new FormControl({ value: (userTemp ? userTemp.telefone : ''), disabled: true }, [Validators.required]),
      endereco: new FormControl({ value: (userTemp ? userTemp.endereco : ''), disabled: true }, [Validators.required]),
      complemento: new FormControl({ value: (userTemp ? userTemp.complemento : ''), disabled: true }, [Validators.required]),
      cidade: new FormControl({ value: (userTemp ? userTemp.cidade : ''), disabled: true }, [Validators.required]),
      estado: new FormControl({ value: (userTemp ? userTemp.estado : ''), disabled: true }, [Validators.required]),
      pais: new FormControl({ value: (userTemp ? userTemp.pais : ''), disabled: true }, [Validators.required]),
      cep: new FormControl({ value: (userTemp ? userTemp.cep : ''), disabled: true }, [Validators.required]),
    });
  }

  pesquisaCPF(cpf: string) {
    this.service.getUser(cpf).subscribe(user => {
      this.usuario = user[0];
      this.showForm = true;
      this.enableSubmit = false;
      this.setStep(1);
      if (user.length > 0) {
        this.montarFormularioUsuario(this.usuario);
        this.newUser = false;
        this.snackBar.open(
          `Este CPF já foi cadastrado, dá uma olhada! 👀`,
          'Beleza!',
          {
            duration: 4000,
          },
        );
      } else {
        this.montarFormularioUsuario();
        this.userForm.get('cpf').setValue(cpf);
        this.toggleEdit();
        this.newUser = true;
        this.snackBar.open(
          `Este CPF não tem cadastro! Bora cadastrar? 😍`,
          'Vamos!',
          {
            duration: 4000,
          },
        );
      }
    }, error => {
      this.snackBar.open(
        `Algo deu errado! Tenta novamente? 😵‍💫`,
        'Vamos!',
        {
          duration: 4000,
        },
      );
    });
  }

  enviarDados(): void {
    const novosDados = this.getNovosDadosUsuario();
    this.service.postUser(novosDados).subscribe(() => {
      this.snackBar.open(
        `Perfil submetido com sucesso! 😀`,
        'Valeu!',
        {
          duration: 4000,
        },
      );
      this.showForm = false;
      this.setStep(0);
      this.signupOk = true;
    }, error => {
      this.snackBar.open(
        `Erro ao atualizar seu perfil! Tenta novamente? 😔`,
        'Eita!',
        {
          duration: 4000,
        },
      );
    });
  }

  atualizarDados(): void {
    const novosDados = this.getNovosDadosUsuario();
    this.service.putUser(novosDados).subscribe(() => {
      this.snackBar.open(
        `Perfil submetido com sucesso! 😀`,
        'Valeu!',
        {
          duration: 4000,
        },
      );
      this.showForm = false;
      this.setStep(0);
      this.signupOk = true;
    }, error => {
      this.snackBar.open(
        `Erro ao atualizar seu perfil! Tenta novamente? 😔`,
        'Eita!',
        {
          duration: 4000,
        },
      );
    });
  }

  removerDados(): void {
    this.service.deleteUser(this.usuario.uid).subscribe(() => {
      this.snackBar.open(
        `Perfil removido com sucesso! 👋🏾`,
        'OK!',
        {
          duration: 4000,
        },
      );
      this.showForm = false;
      this.setStep(0);
    }, error => {
      this.snackBar.open(
        `Erro ao remover seu perfil! Tenta novamente? 😔`,
        'Eita!',
        {
          duration: 4000,
        },
      );
    });
  }

  limpaFormulario() {
    this.cpfForm.reset();
    this.userForm.reset();
    this.signupOk = false;
    this.showForm = false;
    this.newUser = false;
    this.step = 0;
  }

  private getNovosDadosUsuario(): UsuarioModel {
    const userTemp: any = {};
    if (this.usuario) { userTemp.uid = this.usuario.uid };
    userTemp.email = this.userForm.get('email').value;
    userTemp.nome = this.userForm.get('nome').value;
    userTemp.cpf = this.userForm.get('cpf').value;
    userTemp.telefone = this.userForm.get('telefone').value;
    userTemp.endereco = this.userForm.get('endereco').value;
    userTemp.complemento = this.userForm.get('complemento').value;
    userTemp.cidade = this.userForm.get('cidade').value;
    userTemp.estado = this.userForm.get('estado').value;
    userTemp.pais = this.userForm.get('pais').value;
    userTemp.cep = this.userForm.get('cep').value;
    return userTemp;
  }

  toggleEdit(): void {
    this.enableSubmit = true;
    this.showForm = true;
    this.setStep(1);
    this.userForm.get('email').enable();
    this.userForm.get('nome').enable();
    this.userForm.get('cpf').enable();
    this.userForm.get('telefone').enable();
    this.userForm.get('endereco').enable();
    this.userForm.get('complemento').enable();
    this.userForm.get('cidade').enable();
    this.userForm.get('estado').enable();
    this.userForm.get('pais').enable();
    this.userForm.get('cep').enable();
  }

  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

}
