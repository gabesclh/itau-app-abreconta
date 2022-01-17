import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsuarioModel } from '../model/usuario.model';

const MOCKUSER: UsuarioModel = {
  uid: '12345678',
  email: 'gabestylik@gmail.com',
  nome: 'Gabriel Coelho',
  cpf: '12345678900',
  telefone: 11922334455,
  endereco: {
    endereco: 'Rua Jõao Zinho',
    complemento: 'Apt. 123',
    cidade: 'Campinas',
    estado: 'São Paulo',
    pais: 'Brasil',
    cep: '11222333'
  }
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor() { }

  getUser(cpf: string): Observable<UsuarioModel> {
    return of(MOCKUSER);
  }

  setUser(usuarioAtualizado: UsuarioModel): Observable<UsuarioModel> {
    return of(MOCKUSER);
  }

  deleteUser(cpf: string): Observable<UsuarioModel> {
    return of(MOCKUSER);
  }

}
