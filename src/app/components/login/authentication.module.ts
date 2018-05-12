import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../../routes/routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AdminGuard, DashboardGuard, LoginGuard} from '../../services/auth/auth.guard';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {TokenInterceptor} from '../../services/auth/token.interceptor';
import {BrowserModule} from '@angular/platform-browser';
import {CurrentUserService} from '../../services/auth/current-user.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    DashboardGuard,
    LoginGuard,
    AdminGuard,
    AuthenticationService,
    CurrentUserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [LoginComponent]
})
export class AuthenticationModule {
}
