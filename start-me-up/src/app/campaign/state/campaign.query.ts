import { Injectable } from '@angular/core';
import { CampaignState } from './campaign.store';
import { QueryEntity } from '@datorama/akita';
import { CampaignStore } from './campaign.store';
import { Campaign } from 'src/app/model/campaign.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampaignQuery extends QueryEntity<CampaignState> {
  public campaigns$ = this.selectAll();

  constructor(private campaignStore: CampaignStore) {
    super(campaignStore);
  }

  public getLoaded(): boolean {
    return this.getValue().loading;
  }
  public getLoading(): boolean {
    return !this.getValue().loading;
  }
  public getCampaignsNumber(): number {
    return this.getValue().number;
  }
}
