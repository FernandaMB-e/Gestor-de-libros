import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// 1. RUTAS RELATIVAS: Como vista-principal ya está en la carpeta 'components', 
// solo necesitamos subir un nivel (../) para encontrar a los demás componentes.
import { BuscadorFiltrosComponent, FiltrosBusqueda } from '../biblioteca/components/buscador-filtros/buscador-filtros.component';
import { LibroCardComponent, Libro } from '../biblioteca/components/libro-card/libro-card.component';
import { ResumenEstadisticasComponent } from '../biblioteca/components/resumen-estadisticas/resumen-estadisticas.component';
import { HeaderSaludoComponent } from '../biblioteca/components/barra-principal/saludo.component'; // (Dejé la ruta que pusiste)

@Component({
  selector: 'app-vista-principal', // 2. CAMBIO: Ya no es 'app-root'
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    MatButtonModule, 
    MatIconModule, 
    BuscadorFiltrosComponent, 
    LibroCardComponent, 
    ResumenEstadisticasComponent, 
    HeaderSaludoComponent
  ],
  templateUrl: './vista-principal.html', // 3. CAMBIO: Apunta a su propio HTML
  styleUrl: './vista-principal.scss'     // 4. CAMBIO: Apunta a su propio SCSS
})
export class VistaPrincipalComponent { // 5. CAMBIO: Ya no se llama App, se llama VistaPrincipalComponent
  protected readonly title = signal('Biblioteca');
  tituloSeccion = 'Mis libros';

  libros: Libro[] = [];

  actualizarTitulo(filtros: FiltrosBusqueda) {
    if (filtros.favoritos) {
      this.tituloSeccion = 'Favoritos';
    } else if (filtros.estado) {
      this.tituloSeccion = filtros.estado;
    } else if (filtros.disposicion) {
      this.tituloSeccion = filtros.disposicion;
    } else if (filtros.texto !== '') {
      this.tituloSeccion = `Resultados de búsqueda: "${filtros.texto}"`;
    } else {
      this.tituloSeccion = 'Mis libros';
    }
  }

  agregarLibroTemporal() {
    this.libros.push({
      titulo: 'Fuego y Sangre',
      autor: 'George R. R. Martin',
      portada: 'https://m.media-amazon.com/images/I/81zBqbqw1lL._AC_UF1000,1000_QL80_.jpg',
      puntuacion: 5,
      estado: 'Pendientes por leer',
      favorito: true
    });
  }
}