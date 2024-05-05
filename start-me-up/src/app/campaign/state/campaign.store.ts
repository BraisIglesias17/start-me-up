import { Campaign } from 'src/app/model/campaign.model';
import {
  ActiveState,
  EntityState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface CampaignState
  extends EntityState<Campaign, String>,
    ActiveState {
  isLoaded: boolean;
  loading: boolean;
  number: number;
}

export const getInitialState = () => {
  return {
    number: 0,
    isLoaded: false,
  };
};

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'campaign', idKey: 'id' })
export class CampaignStore extends EntityStore<CampaignState> {
  constructor() {
    super(getInitialState());
  }
}
