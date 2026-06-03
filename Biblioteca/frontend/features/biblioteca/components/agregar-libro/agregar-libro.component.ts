import { Component } from '@angular/core'; //define el archivo como un componente de Angular, lo que permite usarlo en la aplicación y definir su comportamiento e interfaz
import { MatIconModule } from '@angular/material/icon'; // MatIconModule para usar los íconos de Material Design, como el corazón
import { Router } from '@angular/router'; // sireve para navegar entre pantallas
import { CommonModule } from '@angular/common'; // CommonModule para usar directivas como ngIf y ngFor que sirven para mostrar u ocultar elementos en el HTML según ciertas condiciones, o para iterar sobre listas de datos y mostrarlos dinámicamente en la interfaz
import { FormsModule } from '@angular/forms'; // FormsModule para usar ngModel en el formulario que sirve para enlazar los campos del formulario con las propiedades del componente, lo que facilita la captura de los datos ingresados por el usuario y su uso en el código TypeScript
import { Libro } from '../../models/libro.model'; // Importación del modelo de libro para usarlo en la creación del nuevo libro

@Component({
  selector: 'app-agregar-libro',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './agregar-libro.component.html',
  styleUrl: './agregar-libro.component.scss'
})
export class AgregarLibroComponent {
    constructor(private router: Router){}

    volver(){ //para volver a la vista principal sin guardar el libro
    this.router.navigate(['/biblioteca']);
    }

    esFavorito = false; //para controlar si el libro es marcado como favorito o no, y mostrar el ícono del corazon lleno o vacío
    toggleFavorito() {
    this.esFavorito = !this.esFavorito;
    }

    calificacion = 0; //para almacenar la calificación del libro ingresada por el usuario
    calificar(valor:number){
    this.calificacion = valor;
    }

    onImagenSeleccionada(event: Event) { //método para manejar la selección de la imagen de portada del libro
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
        return;
    }

    const archivo = input.files[0]; // Obtenemos el archivo seleccionado
    const reader = new FileReader(); // Creamos un FileReader para leer el archivo

    reader.onload = () => { //para mostrar la imagen seleccionada como preview antes de guardarla
        this.imagenPreview = reader.result;
    };

    reader.readAsDataURL(archivo); //para convertir la imagen a base64 y mostrarla como preview
    }

    prestado = false; //para controlar si el libro está prestado o no, y mostrar el campo de "prestado a" solo cuando sea necesario

    imagenPreview: string | ArrayBuffer | null = null; // Para mostrar la imagen seleccionada antes de guardarla

    cancelar() { //para volver a la vista principal sin guardar el libro
    this.router.navigate(['/biblioteca']);
    }

    titulo = ''; //para almacenar el título del libro ingresado por el usuario
    autor = '';
    anio: number | null = null;
    totalPaginas: number | null = null;
    mostrarErrores = false;

    validarFormulario(): boolean { //para validar que los campos obligatorios estén completos antes de guardar el libro
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

    guardarLibro() { //método provicional sin backend
        if (!this.validarFormulario()) {
            return;
        }

        const nuevoLibro: Libro = { //crea un nuevo libro con los datos ingresados por el usuario, usando el modelo de libro importado
            titulo: this.titulo,
            autor: this.autor,
            anio: this.anio!,
            totalPaginas: this.totalPaginas!,
            genero: '',
            portada: this.imagenPreview as string,
            estadoLectura: 'Pendiente por leer',
            disponible: true,
            favorito: this.esFavorito,
            calificacion: this.calificacion,
            resena: ''
        };
        console.log(nuevoLibro); // Imprime el nuevo libro en la consola para verificar que se creó correctamente
        alert('Libro listo para guardarse');
    }

    estadoLeido = false;

}



