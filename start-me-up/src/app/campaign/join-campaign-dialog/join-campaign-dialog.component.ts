import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'src/app/model/campaign.model';

@Component({
  selector: 'app-join-campaign-dialog',
  templateUrl: './join-campaign-dialog.component.html',
  styleUrls: ['./join-campaign-dialog.component.scss'],
})
export class JoinCampaignDialogComponent {
  public donation: number = 0;

  constructor(
    public dialog: MatDialogRef<JoinCampaignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public campaign: Campaign
  ) {}

  public onJoin(): void {
    this.dialog.close({
      response: true,
      donation: this.donation,
      campaign: this.campaign,
    });
  }

  public OnCancel(): void {
    this.dialog.close({ response: false });
  }

  public updateTotalRaise(): number {
    return this.campaign.totalRaised + this.donation;
  }
}
