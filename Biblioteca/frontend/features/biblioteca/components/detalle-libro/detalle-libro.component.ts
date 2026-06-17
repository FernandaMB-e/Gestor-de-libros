import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './detalle-libro.component.html',
  styleUrl: './detalle-libro.component.scss'
})

export class DetalleLibroComponent {

    libro!: Libro;

    estrellas = [1, 2, 3, 4, 5];
    
    constructor(
      private router: Router,
      private bibliotecaService: BibliotecaService
    ) {}

    ngOnInit() {

      const seleccionado =
        this.bibliotecaService.libroSeleccionado;

      if (seleccionado) {
        this.libro = seleccionado;
      }
    }

    volver() {
      this.router.navigate(['/biblioteca']);
    }

    eliminarLibro() {
      if (!this.libro._id) {
        alert('No se encontró el ID del libro');
        return;
      }

      const confirmar = confirm(
        `¿Deseas eliminar "${this.libro.titulo}"?`
      );

      if (!confirmar) {
        return;
      }

      this.bibliotecaService
        .eliminarLibro(this.libro._id)
        .subscribe({

          next: () => {

            alert('Libro eliminado correctamente');

            this.router.navigate(['/biblioteca']);
          },

          error: (error) => {

            console.error(error);

            alert('Error al eliminar el libro');
          }
        });
    }

}