import { Type } from '../model/campaign.model';
import { CampaignCategory } from '../model/campaign.model';
import { User } from '../model/user.model';
import { Campaign } from '../model/campaign.model';

interface MergeDataBase {
  types: Type[];
  categories: CampaignCategory[];
}

export interface MergeDataCampaign extends MergeDataBase {
  user: User;
}

export interface MergeDataEditCampaign extends MergeDataBase {
  campaign: Campaign | undefined;
}
