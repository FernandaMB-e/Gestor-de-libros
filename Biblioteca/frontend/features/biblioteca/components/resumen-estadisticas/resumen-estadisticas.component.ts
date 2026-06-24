import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BibliotecaService } from '../../services/biblioteca.service';

@Component({
  selector: 'app-resumen-estadisticas',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './resumen-estadisticas.component.html',
  styleUrls: ['./resumen-estadisticas.component.scss']
})
export class ResumenEstadisticasComponent implements OnInit {
  
  totales: number = 0;
  leyendo: number = 0;
  leidos: number = 0;
  pendientes: number = 0;
  favoritos: number = 0;
  prestados: number = 0;
  disponibles: number = 0;

  constructor(
    private bibliotecaService: BibliotecaService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    // 1. Carga inicial
    this.cargarEstadisticas();

    // 2. NUEVO: Escuchar cambios para actualizar los números al instante
    this.bibliotecaService.libroCambiado$.subscribe(() => {
      this.cargarEstadisticas();
    });
  }

  // 3. Extraemos la lógica a un método para poder llamarla varias veces
  cargarEstadisticas() {
    this.bibliotecaService.obtenerEstadisticas().subscribe({
      next: (data) => {
        this.totales = data.total;
        this.leyendo = data.leyendo;
        this.leidos = data.leidos;
        this.pendientes = data.pendientes;
        this.favoritos = data.favoritos;
        this.prestados = data.prestados;
        this.disponibles = data.total - data.prestados;
        
        // Avisar a Angular que los datos cambiaron
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar estadísticas', err)
    });
  }
}