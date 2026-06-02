import { Routes } from '@angular/router';

// Importamos todas tus pantallas
import { LoginComponent } from '../../frontend/features/auth/components/login/login.component';
import { RegistroComponent } from '../../frontend/features/auth/components/registro/registro.component';
import { PerfilUsuarioComponent } from '../../frontend/features/perfil/components/perfil-usuario/perfil-usuario.component';
import { VistaPrincipalComponent } from '../../frontend/features/vista-principal/vista-principal';
import { AgregarLibroComponent } from '../../frontend/features/biblioteca/components/agregar-libro/agregar-libro.component';

export const routes: Routes = [
  // Si el usuario entra a la raíz de la página, lo mandamos al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Rutas de Autenticación
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  
  // Rutas de la Aplicación
  { path: 'biblioteca', component: VistaPrincipalComponent },
  { path: 'perfil', component: PerfilUsuarioComponent },
  { path: 'agregar-libro', component: AgregarLibroComponent },

  // Si escriben una URL que no existe, los mandamos al login por seguridad
  { path: '**', redirectTo: 'login' }
];
