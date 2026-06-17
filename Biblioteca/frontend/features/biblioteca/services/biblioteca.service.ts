import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  private apiUrl = 'http://127.0.0.1:8000/libros';

  libroSeleccionado: Libro | null = null;

  constructor(private http: HttpClient) {}

  obtenerLibros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarLibro(libro: any): Observable<any> {
    return this.http.post(this.apiUrl, libro);
  }

  eliminarLibro(id: string) {
    return this.http.delete(`http://127.0.0.1:8000/libros/${id}`);
  }
}