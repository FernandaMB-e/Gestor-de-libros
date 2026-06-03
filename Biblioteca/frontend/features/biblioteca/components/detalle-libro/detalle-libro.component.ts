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

}