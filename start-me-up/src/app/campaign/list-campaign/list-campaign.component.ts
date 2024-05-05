import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Campaign, EMPTY_TYPE, Type } from 'src/app/model/campaign.model';
import { MatList } from '@angular/material/list';
import { differenceInDays } from 'date-fns';
import { EMPTY_USER, User } from 'src/app/model/user.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-campaign',
  templateUrl: './list-campaign.component.html',
  styleUrls: ['./list-campaign.component.scss'],
})
export class ListCampaignComponent implements OnInit {
  @Input() campaigns: Campaign[] = [];

  @Input() pristineCampaigns: Campaign[] = [];

  public campaignTitle: string = '';
  public campaignType: Type = EMPTY_TYPE;
  public emptyType: Type = EMPTY_TYPE;
  public daysRemaining: number = 0;

  @Input() currentUser: User = EMPTY_USER;
  @Input() types: Type[] = [];

  @Output() deleteCampaign: EventEmitter<Campaign> =
    new EventEmitter<Campaign>();

  ngOnInit(): void {
    this.initializeCampaigns();
  }

  private initializeCampaigns() {
    this.pristineCampaigns = JSON.parse(JSON.stringify(this.campaigns));
  }

  public onFilter(): void {
    this.campaigns = this.pristineCampaigns.filter(
      (campaign) =>
        (this.campaignTitle !== '' &&
          campaign.title.includes(this.campaignTitle)) ||
        (this.campaignType !== EMPTY_TYPE &&
          campaign.type.id === this.campaignType.id) ||
        (this.campaignTitle === '' && this.campaignType === EMPTY_TYPE)
    );
  }

  public onSort(): void {
    this.campaigns = this.pristineCampaigns.sort(
      (a, b) => a.financialAim - b.financialAim
    );
  }

  public calcualteDaysRemaining(campaign: Campaign): void {
    this.daysRemaining = differenceInDays(campaign.endDate, new Date());
  }

  public onDelete(campaign: Campaign): void {
    if (campaign.user.id === this.currentUser.id) {
      this.deleteCampaign.emit(campaign);
    }
  }
}
