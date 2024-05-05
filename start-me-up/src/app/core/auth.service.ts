import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { SessionStateService } from './session-state.service';
import { LOGIN_ROUTE } from '../routes';
import { CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(
    private router: Router,
    private sessionState: SessionStateService
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let logged = false;
    this.sessionState.getCurrentUser$().subscribe({
      next: (session) => {
        if (session.accessToken !== '') {
          logged = true;
        } else {
          alert('You are not allowed to view this page');
          this.router.navigateByUrl(LOGIN_ROUTE);
          logged = false;
        }
      },
    });

    return logged;
  }
}
