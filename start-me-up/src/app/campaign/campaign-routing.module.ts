import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignComponent } from './campaign.component';
import { CampaignDetailViewComponent } from './campaign-detail-view/campaign-detail-view.component';
import { MyCampaignsComponent } from './my-campaigns/my-campaigns.component';
import { AuthService } from '../core/auth.service';
import { NewCampaignComponent } from './new-campaign/new-campaign.component';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';
import {
  OWN_CAMPAIGNS_PATH,
  NEW_CAMPAIGNS_PATH,
  DETAIL_CAMPAIGNS_PATH_DECLARATION,
  EDIT_CAMPAIGNS_PATH_DECLARATION,
} from '../routes';

const routes: Routes = [
  {
    path: DETAIL_CAMPAIGNS_PATH_DECLARATION,
    component: CampaignDetailViewComponent,
  },
  { path: OWN_CAMPAIGNS_PATH, component: MyCampaignsComponent },
  {
    path: NEW_CAMPAIGNS_PATH,
    component: NewCampaignComponent,
    canActivate: [AuthService],
  },
  {
    path: EDIT_CAMPAIGNS_PATH_DECLARATION,
    component: EditCampaignComponent,
    canActivate: [AuthService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignRoutingModule {}
