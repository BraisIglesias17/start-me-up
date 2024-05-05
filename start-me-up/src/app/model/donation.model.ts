import { Campaign } from './campaign.model';
import { User } from './user.model';

export interface Donation {
  id: number;
  user: User;
  amount: number;
  campaign: Campaign;
}
