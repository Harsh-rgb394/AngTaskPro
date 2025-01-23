// import { CanActivateFn,Router } from '@angular/router';
// import {Injectable} from "@angular/core"

// @Injectable({
//   providedIn:'root'
// })

// export const authGuard: CanActivateFn = (route, state) => {
//   constructor(private router:Router){}
// };
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirect to login if not logged in
      return false;
    }
    return true;
  }
}
