import { Injectable } from '@angular/core';
import { UserSession, EMPTY_SESSION } from '../model/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionStateService {
  private currentUser$: BehaviorSubject<UserSession> =
    new BehaviorSubject<UserSession>(EMPTY_SESSION);

  constructor() {}

  public setCurrentUser(user: UserSession) {
    this.currentUser$.next(user);
  }

  public getCurrentUser$(): Observable<UserSession> {
    return this.currentUser$.asObservable();
  }
}
