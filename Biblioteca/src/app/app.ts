import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// 1. Importa tu componente desde la ruta donde lo creaste
import { BuscadorFiltrosComponent } from '../../frontend/features/biblioteca/components/buscador-filtros/buscador-filtros.component';

@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate de que esto esté presente
  // 2. Agrega el componente al arreglo de imports
  imports: [RouterOutlet, BuscadorFiltrosComponent], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Biblioteca');
}