import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FMAP File Manager';
  _displayAccountIcons: boolean = true;

  constructor(private authService: AuthService) {}

  get displayAccountIcons() {
    return this._displayAccountIcons;
  }

  ngOnInit() {
    this.authService.authStatus.subscribe(s => {
      setTimeout(() => {
        this._displayAccountIcons = s.isAuthenticated;
        });
    });
  }

  logout() {
    this.authService.logout();
  }
}
