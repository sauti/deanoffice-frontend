import {Injectable} from '@angular/core';

@Injectable()
export class CurrentUserService {
  private currentUser;

  isAdmin() {
    this.currentUser = this.getUser();
    if (this.currentUser == null) return false;
    return this.currentUser.roles.includes('ROLE_ADMIN')
  }

  private getUser(){
    return JSON.parse(localStorage.getItem('currentUser'))
  }
}
