import { Component } from '@angular/core';
import { UserSession } from 'src/app/model/user.model';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/core/utils.service';
import { Observable } from 'rxjs';
import { SessionStateService } from 'src/app/core/session-state.service';
import { User, EMPTY_SESSION } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/api/user.service';
import { LOGIN_ROUTE } from 'src/app/routes';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  user$!: Observable<UserSession>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilsService,
    private sessionState: SessionStateService,
    private userService: UserService
  ) {
    const id = utilService.getParam(activatedRoute, 'id');
    this.user$ = sessionState.getCurrentUser$();
  }

  public onDelete(user: User): void {
    this.userService.delete(user).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/auth/login');
        this.sessionState.setCurrentUser(EMPTY_SESSION);
      },
    });
  }

  public onLogOut(logout: boolean): void {
    if (logout) {
      this.sessionState.setCurrentUser(EMPTY_SESSION);
      this.router.navigateByUrl(LOGIN_ROUTE);
    }
  }
}
