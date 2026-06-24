import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Libro } from '../../models/libro.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogoEliminarComponent } from '../dialogo-eliminar/dialogo-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './detalle-libro.component.html',
  styleUrl: './detalle-libro.component.scss'
})

export class DetalleLibroComponent {

    libro!: Libro;

    estrellas = [1, 2, 3, 4, 5];
    
    constructor(
      private router: Router,
      private bibliotecaService: BibliotecaService,
      private dialog: MatDialog,
      private snackBar: MatSnackBar
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
    const dialogRef = this.dialog.open(
      DialogoEliminarComponent,
      {
        width: '400px',
        data: {
          titulo: this.libro.titulo
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      (resultado) => {

        if (!resultado) {
          return;
        }

        this.bibliotecaService
          .eliminarLibro(this.libro._id!)
          .subscribe({

            next: () => {
              this.bibliotecaService.libroSeleccionado = null;

              this.bibliotecaService.modoEdicion = false;

              this.snackBar.open(
                'Libro eliminado correctamente',
                'Cerrar',
                {
                  duration: 3000,
                  panelClass: ['snackbar-exito']
                }
              );

              this.router.navigate(['/biblioteca']);
          },

            error: () => {

              this.snackBar.open(
                'Error al eliminar el libro',
                'Cerrar',
                {
                  duration: 4000,
                  panelClass: ['snackbar-error']
                }
              );
            }

          });

      }
    );

  }
    editarLibro() {

      this.bibliotecaService.libroSeleccionado =
        this.libro;

      this.bibliotecaService.modoEdicion = true;

      this.router.navigate(['/agregar-libro']);
    }

}