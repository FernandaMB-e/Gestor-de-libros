// 1. Modelo completo que devuelve el backend (Ya registrado)
// Nota: Nunca incluimos la contraseña aquí por seguridad.
export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  fotoPerfil: string; // Ruta o URL de la imagen (ej. 'assets/img/avatar.png')
}

// 2. Modelo de entrada para crear/registrar un nuevo usuario
// Nota: Aquí no hay ID porque el backend lo genera, pero sí va la contraseña.
export interface UsuarioCreate {
  nombre: string;
  correo: string;
  password: string;
  fotoPerfil?: File | null; // Archivo físico por si deciden subir foto al registrarse (opcional)
}

// 3. (Opcional pero recomendado) Modelo para el Login
// Solo necesitamos las credenciales exactas para iniciar sesión
export interface UsuarioLogin {
  correo: string;
  password: string;
}