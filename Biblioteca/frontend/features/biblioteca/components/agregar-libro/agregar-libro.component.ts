import { Component } from '@angular/core'; 
import { MatIconModule } from '@angular/material/icon'; 
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Libro } from '../../models/libro.model'; 
import { BibliotecaService } from '../../services/biblioteca.service'; 

@Component({
  selector: 'app-agregar-libro',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './agregar-libro.component.html',
  styleUrl: './agregar-libro.component.scss'
})
export class AgregarLibroComponent {
    constructor( 
        private router: Router,
        private bibliotecaService: BibliotecaService
    ){}

    ngOnInit() {
        if (
            this.bibliotecaService.modoEdicion &&
            this.bibliotecaService.libroSeleccionado
        ) {

            const libro =
                this.bibliotecaService.libroSeleccionado;

            this.modoEdicion = true;

            this.idLibroEditar = libro._id || '';

            this.titulo = libro.titulo;
            this.autor = libro.autor;
            this.anio = libro.anio;
            this.totalPaginas = libro.totalPaginas;

            this.esFavorito = libro.favorito;

            this.calificacion = libro.calificacion;

            this.imagenPreview = libro.portada;

            this.estadoSeleccionado = libro.estadoLectura;
            this.genero = libro.genero;
            this.tiempoLectura = libro.tiempoLectura || '';
            this.prestado = !libro.disponible;
            this.prestadoA = libro.prestadoA || '';
            this.fechaPrestamo = libro.fechaPrestamo || '';
            this.resena = libro.resena || '';
        }
    }

    volver(){ 
    this.router.navigate(['/biblioteca']);
    }

    esFavorito = false; 
    toggleFavorito() {
    this.esFavorito = !this.esFavorito;
    }

    calificacion = 0; 
    calificar(valor:number){
    this.calificacion = valor;
    }

    onImagenSeleccionada(event: Event) { 
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
        return;
    }

    const archivo = input.files[0]; 
    const reader = new FileReader(); 

    reader.onload = () => { 
        this.imagenPreview = reader.result;
    };

    reader.readAsDataURL(archivo); 
    }

    prestado = false; 

    imagenPreview: string | ArrayBuffer | null = null; 
    cancelar() { 
    this.router.navigate(['/biblioteca']);
    }

    titulo = ''; 
    autor = '';
    anio: number | null = null;
    totalPaginas: number | null = null;
    mostrarErrores = false;
    modoEdicion = false;
    idLibroEditar = '';

    estadoSeleccionado = 'Pendiente por leer'; 
    genero = 'Ciencia ficción';
    tiempoLectura = '';
    prestadoA = '';
    fechaPrestamo = '';
    resena = '';

    validarFormulario(): boolean {
        this.mostrarErrores = true;
        if (!this.titulo.trim()) {
            return false;
        }

        if (!this.autor.trim()) {
            return false;
        }

        if (!this.anio || this.anio <= 0) {
            return false;
        }

         if (!this.totalPaginas || this.totalPaginas <= 0) {
            return false;
        }

        return true;
    }

    guardarLibro() {
        if (!this.validarFormulario()) {
            return;
        }

        const libro: Libro = {
            titulo: this.titulo,
            autor: this.autor,
            anio: this.anio!,
            totalPaginas: this.totalPaginas!,
            
            genero: this.genero, 
            portada: this.imagenPreview as string,
            estadoLectura: this.estadoSeleccionado as any,
            tiempoLectura: this.tiempoLectura,
            disponible: !this.prestado, 
            prestadoA: this.prestadoA,
            fechaPrestamo: this.fechaPrestamo,
            favorito: this.esFavorito,
            calificacion: this.calificacion,
            resena: this.resena 
        };

        if (this.modoEdicion) {
            this.bibliotecaService
                .actualizarLibro(
                    this.idLibroEditar,
                    libro
                )
                .subscribe({

                    next: () => {

                        alert(
                            'Libro actualizado correctamente'
                        );

                        this.bibliotecaService
                            .modoEdicion = false;

                        this.router.navigate([
                            '/biblioteca'
                        ]);
                    },

                    error: (error) => {

                        console.error(error);

                        alert(
                            'Error al actualizar el libro'
                        );
                    }
                });

            return;
        }

        this.bibliotecaService
            .agregarLibro(libro)
            .subscribe({

                next: () => {

                    alert(
                        'Libro guardado correctamente'
                    );

                    this.router.navigate([
                        '/biblioteca'
                    ]);
                },

                error: (error) => {

                    console.error(error);

                    alert(
                        'Error al guardar el libro'
                    );
                }
            });
    }

    estadoLeido = false;

}