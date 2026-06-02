import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
//Rutas 
import { BuscadorFiltrosComponent, FiltrosBusqueda } from '../biblioteca/components/buscador-filtros/buscador-filtros.component';
import { LibroCardComponent, Libro } from '../biblioteca/components/libro-card/libro-card.component';
import { ResumenEstadisticasComponent } from '../biblioteca/components/resumen-estadisticas/resumen-estadisticas.component';
import { HeaderSaludoComponent } from '../biblioteca/components/barra-principal/saludo.component'; 

@Component({
  selector: 'app-vista-principal', 
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
  templateUrl: './vista-principal.html', 
  styleUrl: './vista-principal.scss'     
})
export class VistaPrincipalComponent { 
  protected readonly title = signal('Biblioteca');
  tituloSeccion = 'Mis libros';

  libros: Libro[] = [];

  // Memoria para recordar qué filtros estaban activos antes del nuevo clic
  filtrosAnteriores: FiltrosBusqueda = {
    texto: '',
    estado: null,
    disposicion: null,
    puntuacion: null,
    favoritos: false
  };

 actualizarTitulo(filtros: FiltrosBusqueda) {
    // 1. La búsqueda escrita siempre es la máxima prioridad
    if (filtros.texto !== '') {
      this.tituloSeccion = `Resultados de búsqueda: "${filtros.texto}"`;
    } 
    // NUEVO: Comparamos con la memoria: ¿Acaba de cambiar la Puntuación?
    else if (filtros.puntuacion !== this.filtrosAnteriores.puntuacion && filtros.puntuacion !== null) {
      // Si es 1, ponemos "estrella", si es más, ponemos "estrellas"
      this.tituloSeccion = filtros.puntuacion === 1 ? '1 estrella' : `${filtros.puntuacion} estrellas`;
    }
    // 2. Comparamos con la memoria: ¿Acaba de cambiar la Disposición?
    else if (filtros.disposicion !== this.filtrosAnteriores.disposicion && filtros.disposicion) {
      this.tituloSeccion = filtros.disposicion;
    } 
    // 3. Comparamos con la memoria: ¿Acaba de cambiar el Estado?
    else if (filtros.estado !== this.filtrosAnteriores.estado && filtros.estado) {
      this.tituloSeccion = filtros.estado;
    } 
    // 4. Comparamos con la memoria: ¿Se acaba de presionar Favoritos?
    else if (filtros.favoritos !== this.filtrosAnteriores.favoritos && filtros.favoritos) {
      this.tituloSeccion = 'Favoritos';
    } 
    // 5. Si no cambió nada nuevo, buscamos cuál sigue encendido
    else {
      
      if (filtros.puntuacion !== null) {
        this.tituloSeccion = filtros.puntuacion === 1 ? '1 estrella' : `${filtros.puntuacion} estrellas`;
      } else if (filtros.estado) {
        this.tituloSeccion = filtros.estado;
      } else if (filtros.disposicion) {
        this.tituloSeccion = filtros.disposicion;
      } else if (filtros.favoritos) {
        this.tituloSeccion = 'Favoritos';
      } else {
        this.tituloSeccion = 'Mis libros';
      }
    }

    // AL FINAL: Guardamos los filtros actuales en la memoria para el siguiente clic
    this.filtrosAnteriores = { ...filtros };
  }

  agregarLibroTemporal() {
    this.libros.push({
      titulo: 'Fuego y Sangre',
      autor: 'George R. R. Martin',
      portada: '/img/Portada.jpg',
      puntuacion: 5,
      estado: 'Pendientes por leer',
      favorito: true
    });
  }

  irAgregarLibro() {
    this.router.navigate(['/agregar-libro']);
  }

  constructor(private router: Router) {}

  irAPerfil() {
  this.router.navigate(['/perfil']);
}

cerrarSesion() {
  
  localStorage.clear(); 
  this.router.navigate(['/login']);
}

  
}

