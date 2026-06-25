import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../../auth/services/auth';

interface PerfilUsuario {
  id: string;
  nombre: string;
  correo: string;
  fotoPerfil: string;
}

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: PerfilUsuario = {
    id: '',
    nombre: '',
    correo: '',
    fotoPerfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  };

  password: string = '';
  confirmPassword: string = '';

  ocultarPassword: boolean = true;
  ocultarConfirmPassword: boolean = true;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (!usuarioGuardado) {
      this.router.navigate(['/login']);
      return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    this.usuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      fotoPerfil: usuario.fotoPerfil || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    };
  }

  abrirSelectorFoto(fileInput: HTMLInputElement): void {
    fileInput.value = '';
    fileInput.click();
  }

  onFotoSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (!archivo) {
      return;
    }

    const lector = new FileReader();

    lector.onload = () => {
      const fotoBase64 = lector.result as string;

      this.usuario.fotoPerfil = fotoBase64;

      const datos = {
        nombre: this.usuario.nombre.trim(),
        fotoPerfil: fotoBase64
      };

      this.authService.actualizarFoto(this.usuario.id, datos).subscribe({
        next: (respuesta) => {
          const usuarioActualizado = {
            ...respuesta.usuario,
            fotoPerfil: respuesta.usuario.fotoPerfil || fotoBase64
          };

          this.usuario = usuarioActualizado;
          localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));

          this.snackBar.open(
            'Foto actualizada correctamente',
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-exito']
            }
          );
        },
        error: (error) => {
          console.error('Error al actualizar foto:', error);

          this.snackBar.open(
            'No se pudo actualizar la foto',
            'Cerrar',
            {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-error']
            }
          );
        }
      });
    };

    lector.readAsDataURL(archivo);
  }

  guardarCambios(): void {
    if (!this.formularioCompleto()) {
      return;
    }

    const datos = {
      nombre: this.usuario.nombre.trim(),
      fotoPerfil: this.usuario.fotoPerfil,
      password: this.password.trim()
    };

    this.authService.actualizarUsuario(this.usuario.id, datos).subscribe({
      next: (respuesta) => {
        const usuarioActualizado = {
          ...respuesta.usuario,
          fotoPerfil: respuesta.usuario.fotoPerfil || this.usuario.fotoPerfil
        };

        localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));

        this.usuario = usuarioActualizado;
        this.password = '';
        this.confirmPassword = '';

        this.snackBar.open(
          'Perfil actualizado correctamente',
          'Cerrar',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-exito']
          }
        );
      },
      error: (error) => {
        console.error('Error al actualizar perfil:', error);

        const mensaje = error.error?.detail || 'No se pudo actualizar el perfil';

        this.snackBar.open(
          mensaje,
          'Cerrar',
          {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          }
        );
      }
    });
  }

  volver(): void {
    this.router.navigate(['/biblioteca']);
  }

  formularioCompleto(): boolean {
    return (
      this.usuario.nombre.trim() !== '' &&
      this.usuario.correo.trim() !== '' &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.password.trim() === this.confirmPassword.trim()
    );
  }
}