import { Injectable } from '@angular/core';
import { Libro } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  private libros: Libro[] = [];

  libroSeleccionado: Libro | null = null;

  obtenerLibros(): Libro[] {
    return this.libros;
  }

  agregarLibro(libro: Libro): void {
    this.libros.push(libro);
  }

}