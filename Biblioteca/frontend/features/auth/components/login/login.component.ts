import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  correo: string = '';
  password: string = '';
  ocultarPassword: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  iniciarSesion(): void {
    const datos = {
      correo: this.correo.trim(),
      password: this.password.trim()
    };

    this.authService.login(datos).subscribe({
      next: (respuesta) => {
        console.log('Respuesta del backend:', respuesta);

        if (respuesta.token) {
          localStorage.setItem('token', respuesta.token);
        }

        if (respuesta.usuario) {
          localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
        }

        this.router.navigate(['/biblioteca']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);

        const mensaje = error.error?.detail || 'Correo o contraseña incorrectos';

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