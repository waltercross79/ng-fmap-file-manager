import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UiService } from '../common/ui.service';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  selector: 'app-login'  
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError = '';
  redirectUrl = '/files';
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService
    ) { }

  ngOnInit() {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  async login(submittedForm: FormGroup) {
    this.authService
      .login(submittedForm.value.username, submittedForm.value.password)
      .subscribe(authStatus => {
        if (authStatus.isAuthenticated) {
          this.uiService.showToast(`Welcome! Role: ${authStatus.userRole}`);
          this.router.navigate([this.redirectUrl]);
        }
      }, error => (this.loginError = error));    
  }

}
