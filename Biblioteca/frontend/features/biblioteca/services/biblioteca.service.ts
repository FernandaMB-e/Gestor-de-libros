import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
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

  obtenerLibros(filtros?: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { params: filtros });
  }

  agregarLibro(libro: any): Observable<any> {
    return this.http.post(this.apiUrl, libro);
  }

  actualizarLibro(id: string, libro: any): Observable<any> {
    return this.http.put(
      `http://127.0.0.1:8000/libros/${id}`,
      libro
    );
  }

  eliminarLibro(id: string) {
    return this.http.delete(`http://127.0.0.1:8000/libros/${id}`);
  }

  obtenerEstadisticas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}estadisticas`); 
  }


  
}