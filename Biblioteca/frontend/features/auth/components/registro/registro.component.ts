import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    RouterModule
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  nombre: string = '';
  correo: string = '';
  password: string = '';
  confirmPassword: string = '';

  ocultarPassword = true;
  ocultarConfirmPassword = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrar(): void {
    if (this.password.trim() !== this.confirmPassword.trim()) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const datos = {
      nombre: this.nombre.trim(),
      correo: this.correo.trim(),
      password: this.password.trim()
    };

    this.authService.registro(datos).subscribe({
      next: (respuesta) => {
        console.log('Usuario registrado:', respuesta);
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);

        const mensaje = error.error?.detail || 'No se pudo registrar el usuario';
        alert(mensaje);
      }
    });
  }
}