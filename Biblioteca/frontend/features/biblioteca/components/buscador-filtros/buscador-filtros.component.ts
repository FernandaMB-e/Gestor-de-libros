import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';

export interface FiltrosBusqueda {
  texto: string;
  estado: string | null;
  disposicion: 'Disponible' | 'Prestado' | null;
  puntuacion: number | null; // Estrellas
  favoritos: boolean; // Botón de filtro
}

@Component({
  selector: 'app-buscador-filtros',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatFormFieldModule, MatInputModule, 
    MatSelectModule, MatIconModule, MatButtonToggleModule, MatButtonModule
  ],
  templateUrl: './buscador-filtros.component.html',
  styleUrls: ['./buscador-filtros.component.scss']
})
export class BuscadorFiltrosComponent {
  @Output() filtrosCambio = new EventEmitter<FiltrosBusqueda>();
  @Output() vistaCambio = new EventEmitter<'lista' | 'cuadricula'>();

  textoBusqueda = '';
  estadoSeleccionado: string | null = null;
  disposicionSeleccionada: 'Disponible' | 'Prestado' | null = null;
  puntuacionSeleccionada: number | null = null; 
  favoritos: boolean = false; 
  vistaActual: 'lista' | 'cuadricula' = 'cuadricula';

 
  onFiltroCambio(grupo: string = 'general') {
  if (grupo === 'estado') {
    this.disposicionSeleccionada = null;
    this.puntuacionSeleccionada = null;
    this.favoritos = false;
  } else if (grupo === 'disposicion') {
    this.estadoSeleccionado = null;
    this.puntuacionSeleccionada = null;
    this.favoritos = false;
  } else if (grupo === 'puntuacion') {
    this.estadoSeleccionado = null;
    this.disposicionSeleccionada = null;
    this.favoritos = false;
  }

  this.filtrosCambio.emit({
    texto: this.textoBusqueda,
    estado: this.estadoSeleccionado,
    disposicion: this.disposicionSeleccionada,
    puntuacion: this.puntuacionSeleccionada,
    favoritos: this.favoritos
  });
}

  ejecutarBusqueda() { this.onFiltroCambio(); }

  toggleFavoritos() {
  this.favoritos = !this.favoritos;

  if (this.favoritos) {
    this.estadoSeleccionado = null;
    this.disposicionSeleccionada = null;
    this.puntuacionSeleccionada = null;
  }

  this.onFiltroCambio();
}

  mostrarTodos() {
    this.textoBusqueda = '';
    this.estadoSeleccionado = null;
    this.disposicionSeleccionada = null;
    this.puntuacionSeleccionada = null;
    this.favoritos = false;
    this.onFiltroCambio();
  }
}