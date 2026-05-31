import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    RouterModule // Necesario para usar routerLink en el HTML
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  nombre: string = '';
  correo: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  // Control individual para cada "ojito"
  ocultarPassword = true;
  ocultarConfirmPassword = true;

  registrar() {
    // Doble validación por seguridad
    if (this.password !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    console.log('Nuevo usuario listo para registrar:', {
      nombre: this.nombre,
      correo: this.correo,
      password: this.password
    });
    // Aquí conectaremos con el backend
  }
}