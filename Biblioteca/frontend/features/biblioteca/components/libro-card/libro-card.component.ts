import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Libro } from '../../models/libro.model';
import { BibliotecaService } from '../../services/biblioteca.service';

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
    titulo: 'Fuego y Sangre',
    autor: 'George R.R. Martin',
    anio: 2022,
    totalPaginas: 700,
    genero: 'Fantasía',
    portada: '/img/Portada.jpg',
    estadoLectura: 'Leído',
    disponible: true,
    favorito: true,
    calificacion: 5,
    resena: ''
  };

  // Arreglo auxiliar para poder dibujar exactamente 5 estrellas
  estrellas = [1, 2, 3, 4, 5];

  // Alternar el estado del corazón
  toggleFavorito() {
    this.libro.favorito = !this.libro.favorito;
  }

  verDetalles() {
    this.bibliotecaService.libroSeleccionado = this.libro;
    this.router.navigate(['/detalle-libro']);
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

  constructor( // Inyectamos el Router para poder navegar entre pantallas, y el BibliotecaService para obtener la información del libro seleccionado (aún no implementado)
    private router: Router,
    private bibliotecaService: BibliotecaService
  ) {}
}