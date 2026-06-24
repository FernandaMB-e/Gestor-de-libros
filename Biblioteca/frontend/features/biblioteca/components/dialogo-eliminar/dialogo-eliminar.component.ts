import { Component } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import { inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialogo-eliminar',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './dialogo-eliminar.component.html',
  styleUrl: './dialogo-eliminar.component.scss'
})
export class DialogoEliminarComponent {

  data = inject(MAT_DIALOG_DATA);

}