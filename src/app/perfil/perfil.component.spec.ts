import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { UsuarioMock } from './model/mock/usuario.mock';
import { UsuarioModel } from './model/usuario.model';
import { PerfilComponent } from './perfil.component';
import { PerfilService } from './service/perfil.service';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let service: jasmine.SpyObj<PerfilService>;
  let snack: jasmine.SpyObj<MatSnackBar>;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        SharedModule,
        MaterialModule,
        HttpClientTestingModule,
      ],
      declarations: [PerfilComponent],
      providers: [
        {
          provide: PerfilService,
          usevalue: jasmine.createSpyObj('PerfilService', [
            'getUser',
            'postUser',
            'putUser',
            'deleUser',
          ])
        },
        {
          provide: MatSnackBar,
          usevalue: jasmine.createSpyObj('MatSnackBar', [
            'open',
          ])
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(PerfilService) as jasmine.SpyObj<PerfilService>;
    snack = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter formulário de CPF inválido quando não preenchido', () => {
    expect(component.cpfForm.valid).toBeFalsy();
  });

  it('deve ter formulário de CPF inválido quando preenchido incorretamente', () => {
    component.cpfForm.get('cpf').setValue("123");
    expect(component.cpfForm.valid).toBeFalsy();
  });

  it('deve mostrar formulário de atualização quando pesquisa de CPF encontrar resultado', () => {
    const userMock = [{
      uid: '12345678',
      email: 'gabestylik@gmail.com',
      nome: 'Gabriel Coelho',
      cpf: '12345678900',
      telefone: 11922334455,
      endereco: 'Rua Jõao Zinho',
      complemento: 'Apt. 123',
      cidade: 'Campinas',
      estado: 'São Paulo',
      pais: 'Brasil',
      cep: '11222333'
    }];
    spy = spyOn(service, 'getUser').and.returnValue(of(userMock));
    component.pesquisaCPF('12345678900');
    expect(component.newUser).toBeFalsy();
  });

  it('deve mostrar formulário de cadastro quando pesquisa de CPF não encontrar resultado', () => {
    spy = spyOn(service, 'getUser').and.returnValue(of([]));
    component.pesquisaCPF('12345678900');
    expect(component.newUser).toBeTruthy();
  });

  it('deve mostrar snackbar de erro quando chamada de pesquisa CPF não for concluida', () => {
    spy = spyOn(service, 'getUser').and.returnValue(throwError('error'));
    spy = spyOn(snack, 'open').and.returnValue(null);
    component.pesquisaCPF('12345678900');
    expect(snack.open).toHaveBeenCalled();
  });

  it('deve enviar dados de cadastro para API', () => {
    spy = spyOn(service, 'getUser').and.returnValue(of([]));
    spy = spyOn(service, 'postUser').and.returnValue(of([]));
    component.pesquisaCPF('12345678900')
    component.userForm.get('cpf').setValue('12345678900');
    component.userForm.get('nome').setValue('Teste');
    component.userForm.get('email').setValue('teste@teste.com');
    component.userForm.get('telefone').setValue('11911223344');
    component.userForm.get('endereco').setValue('Teste');
    component.userForm.get('complemento').setValue('Teste');
    component.userForm.get('cidade').setValue('Teste');
    component.userForm.get('estado').setValue('SP');
    component.userForm.get('pais').setValue('Teste');
    component.userForm.get('cep').setValue('12345678');
    component.enviarDados();
    expect(component.signupOk).toBeTruthy();
  });

  it('deve mostrar snackbar de erro quando chamada de cadastro não for concluida', () => {
    spy = spyOn(service, 'getUser').and.returnValue(of([]));
    spy = spyOn(service, 'postUser').and.returnValue(throwError(null));
    spy = spyOn(snack, 'open').and.returnValue(null);
    component.pesquisaCPF('12345678900')
    component.userForm.get('cpf').setValue('12345678900');
    component.userForm.get('nome').setValue('Teste');
    component.userForm.get('email').setValue('teste@teste.com');
    component.userForm.get('telefone').setValue('11911223344');
    component.userForm.get('endereco').setValue('Teste');
    component.userForm.get('complemento').setValue('Teste');
    component.userForm.get('cidade').setValue('Teste');
    component.userForm.get('estado').setValue('SP');
    component.userForm.get('pais').setValue('Teste');
    component.userForm.get('cep').setValue('12345678');
    component.enviarDados();
    expect(snack.open).toHaveBeenCalled();
  });

  it('deve enviar dados de atualização para API', () => {
    const userMock = [{
      uid: '12345678',
      email: 'gabestylik@gmail.com',
      nome: 'Gabriel Coelho',
      cpf: '12345678900',
      telefone: 11922334455,
      endereco: 'Rua Jõao Zinho',
      complemento: 'Apt. 123',
      cidade: 'Campinas',
      estado: 'São Paulo',
      pais: 'Brasil',
      cep: '11222333'
    }];
    spy = spyOn(service, 'getUser').and.returnValue(of(userMock));
    spy = spyOn(service, 'putUser').and.returnValue(of([]));
    component.pesquisaCPF('12345678900')
    component.userForm.get('nome').setValue('Teste atualizado');
    component.atualizarDados();
    expect(component.signupOk).toBeTruthy();
  });

  it('deve mostrar snackbar de erro quando chamada de atualizacao não for concluida', () => {
    const userMock = [{
      uid: '12345678',
      email: 'gabestylik@gmail.com',
      nome: 'Gabriel Coelho',
      cpf: '12345678900',
      telefone: 11922334455,
      endereco: 'Rua Jõao Zinho',
      complemento: 'Apt. 123',
      cidade: 'Campinas',
      estado: 'São Paulo',
      pais: 'Brasil',
      cep: '11222333'
    }];
    spy = spyOn(service, 'getUser').and.returnValue(of(userMock));
    spy = spyOn(service, 'putUser').and.returnValue(throwError(null));
    spy = spyOn(snack, 'open').and.returnValue(null);
    component.pesquisaCPF('12345678900')
    component.userForm.get('nome').setValue('Teste atualizado');
    component.atualizarDados();
    expect(snack.open).toHaveBeenCalled();
  });

  it('deve remover dados através da API', () => {
    const userMock = [{
      uid: '12345678',
      email: 'gabestylik@gmail.com',
      nome: 'Gabriel Coelho',
      cpf: '12345678900',
      telefone: 11922334455,
      endereco: 'Rua Jõao Zinho',
      complemento: 'Apt. 123',
      cidade: 'Campinas',
      estado: 'São Paulo',
      pais: 'Brasil',
      cep: '11222333'
    }];
    spy = spyOn(service, 'getUser').and.returnValue(of(userMock));
    spy = spyOn(service, 'deleteUser').and.returnValue(of([]));
    component.pesquisaCPF('12345678900')
    component.removerDados();
    expect(component.showForm).toBeFalsy();
  });

  it('deve mostrar snackbar de erro quando chamada de remover não for concluida', () => {
    const userMock = [{
      uid: '12345678',
      email: 'gabestylik@gmail.com',
      nome: 'Gabriel Coelho',
      cpf: '12345678900',
      telefone: 11922334455,
      endereco: 'Rua Jõao Zinho',
      complemento: 'Apt. 123',
      cidade: 'Campinas',
      estado: 'São Paulo',
      pais: 'Brasil',
      cep: '11222333'
    }];
    spy = spyOn(service, 'getUser').and.returnValue(of(userMock));
    spy = spyOn(service, 'deleteUser').and.returnValue(throwError(null));
    spy = spyOn(snack, 'open').and.returnValue(null);
    component.pesquisaCPF('12345678900')
    component.removerDados();
    expect(snack.open).toHaveBeenCalled();
  });

  it('deve limpar formulário quando clicar em cancelar ou em nova consulta', () => {
    const userMock = [{
      uid: '12345678',
      email: 'gabestylik@gmail.com',
      nome: 'Gabriel Coelho',
      cpf: '12345678900',
      telefone: 11922334455,
      endereco: 'Rua Jõao Zinho',
      complemento: 'Apt. 123',
      cidade: 'Campinas',
      estado: 'São Paulo',
      pais: 'Brasil',
      cep: '11222333'
    }];
    spy = spyOn(service, 'getUser').and.returnValue(of(userMock));
    component.pesquisaCPF('12345678900');
    component.limpaFormulario();
    expect(component.showForm).toBeFalsy();
  });

});
