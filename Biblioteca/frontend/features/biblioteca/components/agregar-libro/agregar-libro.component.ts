import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-agregar-libro',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './agregar-libro.component.html',
  styleUrl: './agregar-libro.component.scss'
})
export class AgregarLibroComponent {
    constructor(private router: Router){}

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
    mostrarErrores = false;

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
        return true;
    }

    guardarLibro() {
        if (!this.validarFormulario()) {
            return;
        }

        const nuevoLibro: Libro = {
            titulo: this.titulo,
            autor: this.autor,
            anio: this.anio!,
            genero: '',
            portada: this.imagenPreview as string,
            estadoLectura: 'Pendiente por leer',
            disponible: true,
            favorito: this.esFavorito,
            calificacion: this.calificacion,
            resena: ''
        };
        console.log(nuevoLibro);
        alert('Libro listo para guardarse');
    }

}



