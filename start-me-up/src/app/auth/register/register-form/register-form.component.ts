import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateName } from 'src/app/validations/validations';
import { UtilsService } from 'src/app/core/utils.service';
import { EventEmitter } from '@angular/core';
import { FormRegister } from '../register.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  @Output() register = new EventEmitter<FormRegister>();
  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilsService
  ) {
    this.registerForm = formBuilder.group({
      id: ['3', Validators.required],
      name: ['', [Validators.required, validateName()]],
      surname: ['', [Validators.required, validateName()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      repeatedPassword: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public showError(controlName: string): boolean {
    return this.utilService.showError(controlName, this.registerForm.controls);
  }

  public getErrorMessage(controlName: string): string {
    return this.utilService.getErrorMessage(
      controlName,
      this.registerForm.controls
    );
  }

  public onRegister(): void {
    this.register.emit(this.registerForm.value);
  }
}
