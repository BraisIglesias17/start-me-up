import { EMPTY_USER, User } from './user.model';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  type: Type;
  image: string;
  financialAim: number;
  category: CampaignCategory;
  startDate: Date;
  endDate: Date;
  totalRaised: number;
  punctuation: number;
  user: User;
}
export interface Type {
  id: string;
  value: string;
}

export const EMPTY_TYPE = {
  id: '',
  value: '',
};

export interface CampaignCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const EMPTY_CAMPAIGN_CATEGORY = {
  id: '',
  name: '',
  description: '',
  image: '',
};

export const EMPTY_CAMPAIGN: Campaign = {
  id: '',
  title: '',
  description: '',
  type: EMPTY_TYPE,
  image: '',
  financialAim: 0,
  startDate: new Date(),
  endDate: new Date(),
  totalRaised: 0,
  punctuation: 0,
  user: EMPTY_USER,
  category: EMPTY_CAMPAIGN_CATEGORY,
};
