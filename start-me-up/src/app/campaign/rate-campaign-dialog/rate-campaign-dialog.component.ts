import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'src/app/model/campaign.model';

@Component({
  selector: 'app-rate-campaign-dialog',
  templateUrl: './rate-campaign-dialog.component.html',
  styleUrls: ['./rate-campaign-dialog.component.scss'],
})
export class RateCampaignDialogComponent implements OnInit {
  public rate: number = 0;
  public averageRating: number = 0;
  constructor(
    public dialog: MatDialogRef<RateCampaignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public campaign: Campaign
  ) {}

  ngOnInit(): void {
    console.log(this.campaign);
    this.averageRating = this.campaign.punctuation;
  }
  public onJoin(): void {
    this.dialog.close({
      reponse: true,
      rate: this.rate,
      campaign: this.campaign,
    });
  }

  public OnCancel(): void {
    this.dialog.close({ response: false });
  }

  public updateAverage(): number {
    return (this.averageRating + this.rate) / 2;
  }
}
