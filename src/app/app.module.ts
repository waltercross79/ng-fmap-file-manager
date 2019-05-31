import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiService } from './common/ui.service';
import { SimpleDialogComponent } from './common/simple-dialog.component';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth-guard.service';
import { MaterialModule } from './material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LogoutComponent } from './logout/logout.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SimpleDialogComponent,
    LogoutComponent
  ],
  imports: [
    NoopAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [UiService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [SimpleDialogComponent]
})
export class AppModule { }
