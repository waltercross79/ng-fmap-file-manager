import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, MatDatepickerModule, MatDividerModule, MatLineModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatStepperModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule } from '@angular/material';


@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      MatAutocompleteModule,
      MatDatepickerModule,
      MatDividerModule,
      MatLineModule,
      MatNativeDateModule,
      MatRadioModule,
      MatSelectModule,
      MatStepperModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatProgressSpinnerModule
    ],
    exports: [
      CommonModule,
      MatAutocompleteModule,
      MatDatepickerModule,
      MatDividerModule,
      MatLineModule,
      MatNativeDateModule,
      MatRadioModule,
      MatSelectModule,
      MatStepperModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatProgressSpinnerModule  
    ]
  })
export class FmapManagerMaterialModule {

}