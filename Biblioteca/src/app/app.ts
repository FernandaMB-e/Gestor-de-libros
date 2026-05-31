import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // ¡Solo necesitamos importar el RouterOutlet!
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Ya no necesitamos variables de libros ni funciones aquí.
  // El Router se encargará de cambiar las vistas automáticamente.
}