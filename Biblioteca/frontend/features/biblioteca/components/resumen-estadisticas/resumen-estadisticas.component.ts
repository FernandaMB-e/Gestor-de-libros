import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

// Importamos la interfaz Libro para poder usarla en el tipo del @input
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-resumen-estadisticas',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './resumen-estadisticas.component.html',
  styleUrls: ['./resumen-estadisticas.component.scss']
})
export class ResumenEstadisticasComponent {
  // Recibimos la lista de libros desde el componente padre
  @Input() libros: Libro[] = [];

  // ==========================================
  // GETTERS DINÁMICOS (Se actualizan solos)
  // ==========================================
  
  get totales(): number {
    return this.libros.length;
  }

get leyendo(): number {
  return this.libros.filter(
    libro => libro.estadoLectura === 'Leyendo'
  ).length;
}

get leidos(): number {
  return this.libros.filter(
    libro => libro.estadoLectura === 'Leído'
  ).length;
}

get pendientes(): number {
  return this.libros.filter(
    libro => libro.estadoLectura === 'Pendiente por leer'
  ).length;
}

get favoritos(): number {
  return this.libros.filter(
    libro => libro.favorito
  ).length;
}

get prestados(): number {
  return this.libros.filter(
    libro => !libro.disponible
  ).length;
}

get disponibles(): number {
  return this.libros.filter(
    libro => libro.disponible
  ).length;
}
}