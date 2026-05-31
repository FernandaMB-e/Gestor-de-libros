import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Variables para guardar lo que el usuario escriba
  correo: string = '';
  password: string = '';
  
  // Variable para controlar si la contraseña se ve o no (el ojito)
  ocultarPassword = true;

  // Función que se ejecuta al darle clic a "Iniciar Sesión"
  iniciarSesion() {
    console.log('Datos listos para enviar al backend:', {
      correo: this.correo,
      password: this.password
    });
    // Más adelante aquí conectaremos con tu backend
  }
}