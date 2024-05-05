import { Component, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { UtilsService } from 'src/app/core/utils.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm: FormGroup;
  @Output() login: EventEmitter<User> = new EventEmitter<User>();

  constructor(formBuilder: FormBuilder, private utilService: UtilsService) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public showError(controlName: string): boolean {
    return this.utilService.showError(controlName, this.loginForm.controls);
  }
  public getErrorMessage(controlName: string): string {
    return this.utilService.getErrorMessage(
      controlName,
      this.loginForm.controls
    );
  }
  public getDisableLogin(): boolean {
    //conviene explorar combinaciones con pristine y touched
    return this.loginForm.invalid;
  }

  public onLogin(): void {
    this.login.emit(this.loginForm.value);
  }
}
