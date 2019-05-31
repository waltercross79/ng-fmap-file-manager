import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  template: `    
  <div *ngIf="displayLogin">
    <app-login></app-login>
  </div>
  <div *ngIf="!displayLogin">
    <mat-toolbar fxLayout="row" fxLayoutGap="10px" fxLayoutAlign="start center" >
      <a mat-button routerLink="/files" matTooltip="Files" aria-label="Files"><h3>Files</h3></a>
    </mat-toolbar>
  </div>  
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  _displayLogin:boolean = true;
  
  get displayLogin() {
    return this._displayLogin;
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authStatus
      .subscribe(s => this._displayLogin = !s.isAuthenticated);
  }

}
