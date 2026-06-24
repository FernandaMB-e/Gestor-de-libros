import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
    RouterModule,
    MatSnackBarModule
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
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  registrar(): void {
    if (this.password.trim() !== this.confirmPassword.trim()) {
      this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
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

        this.snackBar.open('Usuario registrado correctamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1200);
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);

        const mensaje = error.error?.detail || 'No se pudo registrar el usuario';

        this.snackBar.open(mensaje, 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}