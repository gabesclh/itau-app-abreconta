import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../model/usuario.model';

const MOCKUSER: UsuarioModel = {
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
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  headers = new HttpHeaders().append('accept', 'application/json').append('content-type', 'application/json');

  constructor(private http: HttpClient) { }

  getUser(cpf: string): Observable<any> {
    return this.http.get('http://localhost:8083/usuario/' + cpf, { headers: this.headers });
  }

  postUser(novosDados: UsuarioModel): Observable<any> {
    return this.http.post('http://localhost:8083/usuario', novosDados, { headers: this.headers });
  }

  putUser(novosDados: UsuarioModel): Observable<any> {
    return this.http.put('http://localhost:8083/usuario/' + novosDados.uid, novosDados, { headers: this.headers });
  }

  deleteUser(uid: string): Observable<any> {
    return this.http.delete('http://localhost:8083/usuario/' + uid, { headers: this.headers });
  }

}
