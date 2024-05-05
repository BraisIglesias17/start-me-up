import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignComponent } from './campaign.component';
import { CampaignCardComponent } from './campaign-card/campaign-card.component';
import { ListCampaignComponent } from './list-campaign/list-campaign.component';
import { MatCardModule } from '@angular/material/card';
import { CampaignDetailViewComponent } from './campaign-detail-view/campaign-detail-view.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MyCampaignsComponent } from './my-campaigns/my-campaigns.component';
import { NewCampaignComponent } from './new-campaign/new-campaign.component';
import { NewCampaignFormComponent } from './new-campaign/new-campaign-form/new-campaign-form.component';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';
import { EditCampaignFormComponent } from './edit-campaign/edit-campaign-form/edit-campaign-form.component';
import { JoinCampaignDialogComponent } from './join-campaign-dialog/join-campaign-dialog.component';
import { RateCampaignDialogComponent } from './rate-campaign-dialog/rate-campaign-dialog.component';
import { ListDonationsComponent } from '../donation/list-donations/list-donations.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    CampaignComponent,
    CampaignCardComponent,
    CampaignDetailViewComponent,
    ListCampaignComponent,
    MyCampaignsComponent,
    NewCampaignComponent,
    NewCampaignFormComponent,
    EditCampaignComponent,
    EditCampaignFormComponent,
    JoinCampaignDialogComponent,
    RateCampaignDialogComponent,
    ListDonationsComponent,
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
  ],
})
export class CampaignModule {}
