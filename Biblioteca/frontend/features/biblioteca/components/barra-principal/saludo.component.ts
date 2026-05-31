import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saludo.component.html',
  styleUrls: ['./saludo.component.scss']
})
export class HeaderSaludoComponent {
  // Recibimos el título de la página 
  @Input() tituloPagina: string = '';
  
  // Simulamos el dato dinámico del usuario
  @Input() nombreUsuario: string = 'Maria Fernanda';
}