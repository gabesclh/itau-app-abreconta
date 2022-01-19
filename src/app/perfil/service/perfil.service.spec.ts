import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UsuarioModel } from '../model/usuario.model';
import { PerfilService } from './perfil.service';


describe('PerfilService', () => {
  let service: PerfilService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new PerfilService(httpClientSpy);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar usuario no getUser', (done: DoneFn) => {
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

    httpClientSpy.get.and.returnValue(of(userMock));

    service.getUser('').subscribe(
      user => {
        expect(user).toEqual(userMock, 'usuario mock');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('deve retornar OK no postUser', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of([]));
    service.postUser(new UsuarioModel).subscribe(
      user => {
        expect(user).toEqual([], 'usuario mock');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('deve retornar OK no putUser', (done: DoneFn) => {
    httpClientSpy.put.and.returnValue(of([]));

    service.putUser(new UsuarioModel).subscribe(
      user => {
        expect(user).toEqual([], 'usuario mock');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('deve retornar OK no deleteUser', (done: DoneFn) => {
    httpClientSpy.delete.and.returnValue(of([]));

    service.deleteUser('').subscribe(
      user => {
        expect(user).toEqual([], 'usuario mock');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

});


