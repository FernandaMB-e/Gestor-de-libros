import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { Usuario } from '../../../../core/models/usuario.model';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent {

  constructor(private router: Router) {}

  // Usuario de ejemplo
  usuario: Usuario = {
    id: 1,
    nombre: 'Maria Fernanda',
    correo: 'maria@ejemplo.com',
    fotoPerfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  };

 
  onFotoSeleccionada(event: any): void {

    const archivo = event.target.files[0];

    if (archivo) {

      const lector = new FileReader();

      lector.onload = (e: any) => {
        this.usuario.fotoPerfil = e.target.result;
      };

      lector.readAsDataURL(archivo);
    }
  }

  // Guardar cambios
  guardarCambios(): void {
    console.log('Guardando perfil actualizado:', this.usuario);
  }

  // Volver a la biblioteca
  volver(): void {
    this.router.navigate(['/biblioteca']);
  }

}