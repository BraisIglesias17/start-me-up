import { Injectable } from '@angular/core';
import { Campaign } from 'src/app/model/campaign.model';
import { CampaignService } from 'src/app/core/api/campaign.service';
import { CampaignQuery } from './campaign.query';
import { CampaignStore } from './campaign.store';

@Injectable({
  providedIn: 'root',
})
export class CampaignActions {
  constructor(
    private campaignService: CampaignService,
    private campaignStore: CampaignStore,
    private campaignQuery: CampaignQuery
  ) {}

  public getCampaigns(): void {
    if (!this.campaignQuery.getHasCache() || !this.campaignQuery.campaigns$) {
      this.loadCampaigns();
    }
  }

  private loadCampaigns(): void {
    this.campaignStore.setLoading(true);
    this.campaignStore.setError(null);

    this.campaignService.getAll().subscribe({
      next: (response: Campaign[]) => {
        this.campaignStore.set(response);
        this.campaignStore.setLoading(false);
      },
      error: (error) => {
        this.campaignStore.setError(true);
        this.campaignStore.setLoading(false);
      },
    });
  }

  public getById(id: string) {
    if (
      this.campaignQuery.getLoaded() &&
      this.campaignQuery.getActiveId() == id
    ) {
    } else {
      this.loadCampaignById(id);
    }
  }

  public loadCampaignById(id: string) {
    this.campaignStore.setLoading(true);
    this.campaignStore.setError(null);
    this.campaignService.getById(id).subscribe({
      next: (campaign) => {
        if (campaign) {
          this.loadCampaign(campaign);
        }
      },
      error: (error) => {
        this.campaignStore.setError(true);
      },
    });
  }

  private loadCampaign(campaign: Campaign) {
    this.campaignStore.setActive(campaign.id);
    this.campaignStore.add(campaign);
  }
}
