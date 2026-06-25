import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Rutas e imports
import { BuscadorFiltrosComponent, FiltrosBusqueda } from '../biblioteca/components/buscador-filtros/buscador-filtros.component';
import { LibroCardComponent } from '../biblioteca/components/libro-card/libro-card.component';
import { Libro } from '../biblioteca/models/libro.model';
import { ResumenEstadisticasComponent } from '../biblioteca/components/resumen-estadisticas/resumen-estadisticas.component';
import { HeaderSaludoComponent } from '../biblioteca/components/barra-principal/saludo.component';
import { BibliotecaService } from '../biblioteca/services/biblioteca.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-vista-principal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    BuscadorFiltrosComponent,
    LibroCardComponent,
    ResumenEstadisticasComponent,
    HeaderSaludoComponent
  ],
  templateUrl: './vista-principal.html',
  styleUrl: './vista-principal.scss'
})
export class VistaPrincipalComponent implements OnInit {
  protected readonly title = signal('Biblioteca');

  tituloSeccion = 'Mis libros';
  libros: Libro[] = [];

  
  nombreUsuario: string = 'Usuario';

  
  totalLibros = 0;

  filtrosAnteriores: FiltrosBusqueda = {
    texto: '',
    estado: null,
    disposicion: null,
    puntuacion: null,
    favoritos: false
  };

  busquedaActiva: boolean = false;

  constructor(
    private router: Router,
    private bibliotecaService: BibliotecaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarUsuario();
    this.cargarTodo();

    this.bibliotecaService.libroCambiado$.subscribe(() => {
      this.cargarTodo();
    });
  }

  cargarUsuario() {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      try {
        const usuario = JSON.parse(usuarioGuardado);
        this.nombreUsuario = usuario.nombre || 'Usuario';
      } catch (error) {
        console.error('Error al leer el usuario guardado:', error);
        this.nombreUsuario = 'Usuario';
      }
    }
  }

  cargarTodo() {
    this.busquedaActiva = false;

    this.bibliotecaService.obtenerLibros().subscribe({
      next: (libros) => {
        this.libros = libros;

        // Aquí guardamos el total real de libros de la biblioteca
        this.totalLibros = libros.length;

        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al obtener libros:', error)
    });
  }

  obtenerMensajeVacio(): string {
    if (this.busquedaActiva && this.totalLibros > 0) {
      return 'No hay ningún libro con esa descripción';
    }

    return 'Aún no has agregado ningún libro';
  }

  actualizarTitulo(filtros: FiltrosBusqueda) {
    if (filtros.texto !== '') {
      this.tituloSeccion = `Resultados de búsqueda: "${filtros.texto}"`;
    } else if (filtros.puntuacion !== this.filtrosAnteriores.puntuacion && filtros.puntuacion !== null) {
      this.tituloSeccion = filtros.puntuacion === 1 ? '1 estrella' : `${filtros.puntuacion} estrellas`;
    } else if (filtros.disposicion !== this.filtrosAnteriores.disposicion && filtros.disposicion) {
      this.tituloSeccion = filtros.disposicion;
    } else if (filtros.estado !== this.filtrosAnteriores.estado && filtros.estado) {
      this.tituloSeccion = filtros.estado;
    } else if (filtros.favoritos !== this.filtrosAnteriores.favoritos && filtros.favoritos) {
      this.tituloSeccion = 'Favoritos';
    } else {
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

    this.filtrosAnteriores = { ...filtros };
  }

  irAgregarLibro() {
    this.bibliotecaService.libroSeleccionado = null;
    this.bibliotecaService.modoEdicion = false;
    this.router.navigate(['/agregar-libro']);
  }

  irAPerfil() {
    this.router.navigate(['/perfil']);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  filtrarLibros(filtros: FiltrosBusqueda) {
    this.actualizarTitulo(filtros);

    let parametrosLimpios: any = {};
    let hayFiltros = false;

    if (filtros.texto) {
      parametrosLimpios.busqueda = filtros.texto;
      hayFiltros = true;
    }

    if (filtros.estado) {
      parametrosLimpios.estado = filtros.estado;
      hayFiltros = true;
    }

    if (filtros.favoritos) {
      parametrosLimpios.favoritos = true;
      hayFiltros = true;
    }

    if (filtros.disposicion) {
      parametrosLimpios.disposicion = filtros.disposicion;
      hayFiltros = true;
    }

    if (filtros.puntuacion !== null) {
      parametrosLimpios.puntuacion = filtros.puntuacion;
      hayFiltros = true;
    }

    this.busquedaActiva = hayFiltros;

    this.bibliotecaService.obtenerLibros(parametrosLimpios).subscribe({
      next: (librosFiltrados) => {
        this.libros = librosFiltrados;
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al filtrar libros:', error)
    });
  }
}