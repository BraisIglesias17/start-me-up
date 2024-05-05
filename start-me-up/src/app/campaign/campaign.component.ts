import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../core/api/campaign.service';
import { Observable } from 'rxjs';
import { Campaign, Type } from '../model/campaign.model';
import { Donation } from '../model/donation.model';
import { DonationService } from '../core/api/donation.service';
import { BehaviorSubject } from 'rxjs';
import { CampaignActions } from './state/campaign.actions';
import { CampaignQuery } from './state/campaign.query';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {
  campaigns$!: Observable<Campaign[]>;
  donations$: Observable<Donation[]>;
  types$: Observable<Type[]>;

  constructor(
    private campaignService: CampaignService,
    private donationService: DonationService,
    private campaignActions: CampaignActions,
    private campaignQuery: CampaignQuery
  ) {
    this.types$ = this.campaignService.getTypes();
    this.donations$ = this.donationService.getAll();
  }

  private initializeCampaigns(): void {
    this.campaignActions.getCampaigns();
    this.campaigns$ = this.campaignQuery.campaigns$;

    console.log(this.campaignQuery.getAll());
  }

  public ngOnInit(): void {
    this.initializeCampaigns();
  }
}
