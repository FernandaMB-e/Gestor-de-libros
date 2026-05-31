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
  // Dato dinámico que recibimos del padre
  @Input() nombreUsuario: string = 'Adrian'; 
}