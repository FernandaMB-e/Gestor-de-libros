import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


import { Usuario } from '../../../../core/models/usuario.model'; 

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent {
  
  // Simulamos al usuario logeado con los datos que definiste en tu modelo
  usuario: Usuario = {
    id: 1,
    nombre: 'Maria Fernanda',
    correo: 'maria@ejemplo.com',
    // Usamos un avatar gris por defecto
    fotoPerfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' 
  };

  // Función que se dispara cuando eliges una foto nueva de tus carpetas
  onFotoSeleccionada(event: any) {
    const archivo = event.target.files[0];
    
    if (archivo) {
      // Usamos FileReader para leer la imagen y mostrarla en pantalla inmediatamente
      const lector = new FileReader();
      lector.onload = (e: any) => {
        this.usuario.fotoPerfil = e.target.result;
      };
      lector.readAsDataURL(archivo);
    }
  }

  guardarCambios() {
    console.log('Guardando perfil actualizado:', this.usuario);
  }
}