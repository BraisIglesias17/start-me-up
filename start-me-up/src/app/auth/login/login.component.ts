import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/core/api/user.service';
import { Router } from '@angular/router';
import { SessionStateService } from 'src/app/core/session-state.service';
import { CAMPAIGNS_BASE_ROUTE } from 'src/app/routes';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  errorLogin: boolean = false;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private sessionService: SessionStateService
  ) {}

  public onLogin(user: User): void {
    this.userService.login(user).subscribe({
      next: (toret) => {
        this.errorLogin = false;
        this.sessionService.setCurrentUser(toret);
        this.router.navigateByUrl(CAMPAIGNS_BASE_ROUTE);
      },
      error: (err) => {
        this.errorLogin = true;
        this.errorMessage = err.error;
      },
    });
  }
}
