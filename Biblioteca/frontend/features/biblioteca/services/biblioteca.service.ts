import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Libro } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  libroCambiado$ = new Subject<void>();

  private apiUrl = 'http://127.0.0.1:8000/libros/';

  libroSeleccionado: Libro | null = null;
  modoEdicion = false;

  constructor(private http: HttpClient) {}

  private obtenerUsuarioId(): string {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (!usuarioGuardado) {
      return '';
    }

    try {
      const usuario = JSON.parse(usuarioGuardado);
      return usuario.id || '';
    } catch (error) {
      console.error('Error al leer usuario:', error);
      return '';
    }
  }

  obtenerLibros(filtros: any = {}): Observable<Libro[]> {
    let params = new HttpParams();

    const usuarioId = this.obtenerUsuarioId();

    if (usuarioId) {
      params = params.set('usuarioId', usuarioId);
    }

    Object.keys(filtros).forEach(key => {
      const valor = filtros[key];

      if (valor !== null && valor !== undefined && valor !== '' && valor !== 'null') {
        params = params.set(key, valor);
      }
    });

    return this.http.get<Libro[]>(this.apiUrl, { params });
  }

  agregarLibro(libro: any): Observable<any> {
    const usuarioId = this.obtenerUsuarioId();

    const libroConUsuario = {
      ...libro,
      usuarioId: usuarioId
    };

    return this.http.post(this.apiUrl, libroConUsuario);
  }

  actualizarLibro(id: string, libro: any): Observable<any> {
    const usuarioId = this.obtenerUsuarioId();

    const libroConUsuario = {
      ...libro,
      usuarioId: usuarioId
    };

    return this.http.put(
      `http://127.0.0.1:8000/libros/${id}`,
      libroConUsuario
    );
  }

  eliminarLibro(id: string) {
    const usuarioId = this.obtenerUsuarioId();

    let params = new HttpParams();

    if (usuarioId) {
      params = params.set('usuarioId', usuarioId);
    }

    return this.http.delete(`http://127.0.0.1:8000/libros/${id}`, { params });
  }

  obtenerEstadisticas(): Observable<any> {
    const usuarioId = this.obtenerUsuarioId();

    let params = new HttpParams();

    if (usuarioId) {
      params = params.set('usuarioId', usuarioId);
    }

    return this.http.get<any>(`${this.apiUrl}estadisticas`, { params });
  }
}