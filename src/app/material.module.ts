import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatIconModule, MatToolbarModule, MatCardModule, MatDialogModule, MatSnackBarModule, MatFormFieldModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule 
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,    
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule    
  ]
})
export class MaterialModule { }
