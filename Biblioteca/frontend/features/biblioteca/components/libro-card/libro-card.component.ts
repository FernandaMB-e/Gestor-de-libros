import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface Libro {
  titulo: string;
  autor: string;
  portada: string;
  puntuacion: number;
  estado: 'Leyendo' | 'Leídos' | 'Pendientes por leer';
  favorito: boolean;
}

@Component({
  selector: 'app-libro-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './libro-card.component.html',
  styleUrls: ['./libro-card.component.scss']
})
export class LibroCardComponent {
  // Recibe la información del libro desde el componente padre
  // Le ponemos datos por defecto para que puedas ver el diseño de inmediato
  @Input() libro: Libro = {
    titulo: 'El Nombre del Viento',
    autor: 'Patrick Rothfuss',
    portada: 'https://m.media-amazon.com/images/I/91b8oNwaV1L.jpg', // Imagen de prueba
    puntuacion: 4,
    estado: 'Leyendo',
    favorito: true
  };

  // Arreglo auxiliar para poder dibujar exactamente 5 estrellas
  estrellas = [1, 2, 3, 4, 5];

  // Alternar el estado del corazón
  toggleFavorito() {
    this.libro.favorito = !this.libro.favorito;
  }

  // Asigna un color diferente dependiendo del estado
  obtenerClaseEstado(estado: string): string {
    switch (estado) {
      case 'Leyendo': return 'badge-leyendo';
      case 'Leídos': return 'badge-leidos';
      case 'Pendientes por leer': return 'badge-pendientes';
      default: return 'badge-default';
    }
  }
}