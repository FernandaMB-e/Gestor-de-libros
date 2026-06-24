import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginData {
  correo: string;
  password: string;
}

interface RegistroData {
  nombre: string;
  correo: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  login(datos: LoginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, datos);
  }

  registro(datos: RegistroData): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/registro`, datos);
  }
 actualizarUsuario(id: string, datos: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/auth/usuarios/${id}`, datos);
}
  
}