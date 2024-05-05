import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateName(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const name = control.value;
    let valid = false;

    let match = name.match('[a-zA-Z ]*');

    if (match === null || match![0] !== name) valid = false;
    else valid = true;
    return valid ? null : { nameValid: true };
  };
}
