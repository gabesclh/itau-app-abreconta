import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../model/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  headers = new HttpHeaders().append('accept', 'application/json').append('content-type', 'application/json');

  constructor(private http: HttpClient) { }

  getUser(cpf: string): Observable<any> {
    return this.http.get(environment.apiUrl + cpf, { headers: this.headers });
  }

  postUser(novosDados: UsuarioModel): Observable<any> {
    return this.http.post(environment.apiUrl, novosDados, { headers: this.headers });
  }

  putUser(novosDados: UsuarioModel): Observable<any> {
    return this.http.put(environment.apiUrl + novosDados.uid, novosDados, { headers: this.headers });
  }

  deleteUser(uid: string): Observable<any> {
    return this.http.delete(environment.apiUrl + uid, { headers: this.headers });
  }

}
