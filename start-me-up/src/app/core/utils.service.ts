import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ERROR_HASH } from './constantes';
import { ActivatedRoute } from '@angular/router';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  public showError(
    controlName: string,
    ctl: { [key: string]: AbstractControl }
  ): boolean {
    const control = ctl[controlName];
    return control && control.invalid && control.touched;
  }

  public getErrorMessage(
    controlName: string,
    ctl: { [key: string]: AbstractControl }
  ): string {
    const control = ctl[controlName];
    const keys = control ? Object.keys(control.errors || {}) : [];
    let message = '';
    if (keys.length > 0) message = ERROR_HASH[keys[0]];
    return message;
  }

  public getParam(activatedRoute: ActivatedRoute, paramName: string) {
    return activatedRoute.snapshot.paramMap.get(paramName);
  }

  // showDialog(
  //   message: string,
  //   route: string,
  //   dialog: MatDialog,
  //   component: MessageDialogComponent
  // ) {
  //   const dialogRef = dialog.open(component, {
  //     width: '250px',
  //     data: {
  //       message: message,
  //       route: route,
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe({
  //     next: (result) => {
  //       if (result === true) {
  //       }
  //     },
  //   });
  // }
}
