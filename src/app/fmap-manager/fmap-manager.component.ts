import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  styles: [],
  template: `
    <mat-toolbar fxLayout="row" fxLayoutGap="10px" fxLayoutAlign="start center" >
        <a mat-button routerLink="/files/add"><h3>Add File</h3></a>
        <a mat-button routerLink="/files/search"><h3>Search</h3></a>      
    </mat-toolbar>
    <router-outlet></router-outlet>
  `
})
export class FmapManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
