import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _user: UserService) { }
  canActivate(): boolean {
    if (this._user.loggedIn()) {
      return true
    } else {
      this._router.navigate([ '/login']);
      return false
    }
  }
}
