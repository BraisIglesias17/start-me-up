import { Component, Input, Output } from '@angular/core';
import { Campaign, EMPTY_CAMPAIGN } from 'src/app/model/campaign.model';
import { User, EMPTY_USER } from 'src/app/model/user.model';
import { DETAIL_CAMPAIGNS_PATH, EDIT_CAMPAIGN_ROUTE } from 'src/app/routes';
import { EventEmitter } from '@angular/core';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss'],
})
export class CampaignCardComponent {
  @Input() daysRemaining: number = 0;
  detailCampaignRoute: string = DETAIL_CAMPAIGNS_PATH;
  editCampaingRoute: string = '/' + EDIT_CAMPAIGN_ROUTE;
  @Input() campaign: Campaign = EMPTY_CAMPAIGN;
  @Input() currentUser: User = EMPTY_USER;
  @Output() deleteCampaign: EventEmitter<Campaign> =
    new EventEmitter<Campaign>();

  constructor(private dialog: MatDialog) {}

  public calculatePercentaje(): number {
    return (this.campaign.totalRaised * 100) / this.campaign.financialAim;
  }

  public onDeleteCampaign(): void {
    const deleteMessage: string = `The  ${this.campaign.title} campaign deleted permanently. Are you sure?`;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: deleteMessage,
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result === true) {
          this.emitDeleteCampaign();
        }
      },
    });
  }
  private emitDeleteCampaign() {
    this.deleteCampaign.emit(this.campaign);
  }
}
