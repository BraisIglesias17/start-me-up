import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/core/api/user.service';
import { SessionStateService } from 'src/app/core/session-state.service';
import { Router } from '@angular/router';
import { FormRegister } from './register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private sessionService: SessionStateService
  ) {}
  showError: boolean = false;
  errorMessage: string = '';

  public onRegister(event: FormRegister): void {
    const values = event;
    const password = values.password;
    const repeatedPassword = values.repeatedPassword;

    if (password === repeatedPassword) {
      this.showError = false;
      const user: User = {
        id: values.id,
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
      };

      this.userService.register(user).subscribe({
        next: (toret) => {
          this.sessionService.setCurrentUser(toret);
          this.router.navigateByUrl('');
        },
        error: (err) => {
          this.showError = true;
          this.errorMessage = err.error;
        },
      });
    } else {
      this.showError = true;
      this.errorMessage = 'Password do not match';
    }
  }
}
