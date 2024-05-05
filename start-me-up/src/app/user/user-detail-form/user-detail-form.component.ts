import { Component, Input, Output } from '@angular/core';
import { EMPTY_USER, User } from 'src/app/model/user.model';
import { EventEmitter } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-detail-form',
  templateUrl: './user-detail-form.component.html',
  styleUrls: ['./user-detail-form.component.scss'],
})
export class UserDetailFormComponent {
  @Input() user: User = EMPTY_USER;

  @Output() delete: EventEmitter<User> = new EventEmitter<User>();

  @Output() logOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog) {}

  public showConfirmation(): void {
    const deleteMessage: string =
      'Your account will be deleted permanently. Are you sure?';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: deleteMessage,
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result === true) {
          this.onDelete();
        }
      },
    });
  }
  public onDelete(): void {
    this.delete.emit(this.user);
  }

  public onLogOut(): void {
    this.logOut.emit(true);
  }
}
