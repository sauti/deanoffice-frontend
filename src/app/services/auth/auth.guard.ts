import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {CurrentUserService} from './current-user.service';

@Injectable()
export class DashboardGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (!localStorage.getItem('currentUser')) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private currentUser: CurrentUserService) { }

  canActivate() {
    if (this.currentUser.isAdmin()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
