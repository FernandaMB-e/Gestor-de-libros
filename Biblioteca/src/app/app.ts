import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf y *ngFor
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { BuscadorFiltrosComponent, FiltrosBusqueda } from '../../frontend/features/biblioteca/components/buscador-filtros/buscador-filtros.component';
// Importamos también la interfaz Libro
import { LibroCardComponent, Libro } from '../../frontend/features/biblioteca/components/libro-card/libro-card.component';
// Importamos también la interfaz de la información general
import { ResumenEstadisticasComponent } from '../../frontend/features/biblioteca/components/resumen-estadisticas/resumen-estadisticas.component';
//Importamos la barra superior 
import { HeaderSaludoComponent } from '../../frontend/features/biblioteca/components/barra-principal/saludo.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, MatIconModule, BuscadorFiltrosComponent, LibroCardComponent, ResumenEstadisticasComponent, HeaderSaludoComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Biblioteca');
  tituloSeccion = 'Mis libros';

  // Inicializamos la biblioteca vacía para mostrar la pantalla de "No tienes libros"
  libros: Libro[] = [];

  actualizarTitulo(filtros: FiltrosBusqueda) {
    if (filtros.favoritos) {
      this.tituloSeccion = 'Favoritos';
    } else if (filtros.estado) {
      this.tituloSeccion = filtros.estado;
    } else if (filtros.disposicion) {
      this.tituloSeccion = filtros.disposicion;
    } else if (filtros.texto !== '') {
      this.tituloSeccion = `Resultados de búsqueda: "${filtros.texto}"`;
    } else {
      this.tituloSeccion = 'Mis libros';
    }
  }

  // Función temporal para simular que agregamos un libro
  agregarLibroTemporal() {
    this.libros.push({
      titulo: 'Fuego y Sangre',
      autor: 'George R. R. Martin',
      portada: 'https://m.media-amazon.com/images/I/81zBqbqw1lL._AC_UF1000,1000_QL80_.jpg',
      puntuacion: 5,
      estado: 'Pendientes por leer',
      favorito: true
    });
  }
}