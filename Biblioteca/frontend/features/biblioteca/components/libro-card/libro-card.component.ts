import { ChangeDetectorRef, Component, Input } from '@angular/core';
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

  estrellas = [1, 2, 3, 4, 5];

  constructor( 
    private router: Router,
    private bibliotecaService: BibliotecaService,
    private cdr: ChangeDetectorRef
  ) {}

  
  toggleFavorito(event: Event) {
    event.stopPropagation(); 
    
    this.libro.favorito = !this.libro.favorito;
    
    this.bibliotecaService.actualizarLibro(this.libro._id!, this.libro).subscribe({
      next: () => {
        
        this.bibliotecaService.libroCambiado$.next(); 
        
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Error al actualizar favorito:', err)
    });
  }

  verDetalles() {
    this.bibliotecaService.libroSeleccionado = this.libro;
    this.router.navigate(['/detalle-libro']);
  }

  obtenerClaseEstado(estado: string): string {
    
    switch (estado) {
      case 'Leyendo': return 'badge-leyendo';
      case 'Leído': return 'badge-leidos'; 
      case 'Pendiente por leer': return 'badge-pendientes'; 
      default: return 'badge-default';
    }
  }
}