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

  usuario = new UsuarioModel();
  userForm: FormGroup;
  cpfForm: FormGroup;
  showForm = false;
  hide = true;
  step = 0;

  constructor(
    private readonly snackBar: MatSnackBar,
    public service: PerfilService,
  ) {
  }

  ngOnInit(): void {
    this.montarFormularioCPF();
  }

  private montarFormularioCPF() {
    this.cpfForm = new FormGroup({
      cpf: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
  }

  private montarFormularioUsuario() {
    this.userForm = new FormGroup({
      email: new FormControl({ value: (this.usuario.email ? this.usuario.email : ''), disabled: true }, [Validators.required, Validators.email]),
      nome: new FormControl({ value: (this.usuario.nome ? this.usuario.nome : ''), disabled: true }, [Validators.required]),
      cpf: new FormControl({ value: (this.usuario.cpf ? this.usuario.cpf : ''), disabled: true }, [Validators.required]),
      telefone: new FormControl({ value: (this.usuario.telefone ? this.usuario.telefone : ''), disabled: true }, [Validators.required]),
      endereco: new FormControl({ value: (this.usuario.endereco ? this.usuario.endereco.endereco : ''), disabled: true }, [Validators.required]),
      complemento: new FormControl({ value: (this.usuario.endereco ? this.usuario.endereco.complemento : ''), disabled: true }, [Validators.required]),
      cidade: new FormControl({ value: (this.usuario.endereco ? this.usuario.endereco.cidade : ''), disabled: true }, [Validators.required]),
      estado: new FormControl({ value: (this.usuario.endereco ? this.usuario.endereco.estado : ''), disabled: true }, [Validators.required]),
      pais: new FormControl({ value: (this.usuario.endereco ? this.usuario.endereco.pais : ''), disabled: true }, [Validators.required]),
      cep: new FormControl({ value: (this.usuario.endereco ? this.usuario.endereco.cep : ''), disabled: true }, [Validators.required]),
    });
  }

  pesquisaCPF(cpf: string) {
    this.service.getUser(cpf).subscribe(user => {
      this.usuario = user;
      this.montarFormularioUsuario();
      this.showForm = true;
      this.setStep(1);
      this.snackBar.open(
        `Este CPF já foi cadastrado, dá uma olhada! 👀`,
        'Beleza!',
        {
          duration: 4000,
        },
      );
    }, error => {
      this.snackBar.open(
        `Este CPF ainda não foi cadastrado, vamos lá? 😍`,
        'Vamos!',
        {
          duration: 4000,
        },
      );
    });
  }

  enviarDados(): void {
    const novosDados = this.getNovosDadosUsuario();
    this.service.setUser(novosDados).subscribe(() => {
      this.snackBar.open(
        `Perfil submetido com sucesso! 😀`,
        'Valeu!',
        {
          duration: 4000,
        },
      );
      this.showForm = false;
      this.setStep(0);
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
    const novosDados = this.getNovosDadosUsuario();
    this.service.deleteUser(novosDados.cpf).subscribe(() => {
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
    this.showForm = false;
    this.step = 0;
  }

  private getNovosDadosUsuario(): UsuarioModel {
    const userTemp: any = {};
    userTemp.email = this.userForm.get('email').value;
    userTemp.nome = this.userForm.get('nome').value;
    userTemp.cpf = this.userForm.get('cpf').value;
    userTemp.telefone = this.userForm.get('telefone').value;
    userTemp.endereco = {};
    userTemp.endereco.endereco = this.userForm.get('endereco').value;
    userTemp.endereco.complemento = this.userForm.get('complemento').value;
    userTemp.endereco.cidade = this.userForm.get('cidade').value;
    userTemp.endereco.estado = this.userForm.get('estado').value;
    userTemp.endereco.pais = this.userForm.get('pais').value;
    userTemp.endereco.cep = this.userForm.get('cep').value;
    return userTemp;
  }

  toggleEdit(): void {
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
