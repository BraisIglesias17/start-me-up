import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { CampaignService } from 'src/app/core/api/campaign.service';
import { MatDialog } from '@angular/material/dialog';
import { Campaign, Type } from 'src/app/model/campaign.model';
import { SessionStateService } from 'src/app/core/session-state.service';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';
import { LOGIN_ROUTE, CREATE_CAMPAIGN_ROUTE } from 'src/app/routes';
import { EMPTY_USER, User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { OWN_CAMPAIGNS_ROUTE, CAMPAIGNS_BASE_ROUTE } from 'src/app/routes';
@Component({
  selector: 'app-my-campaigns',
  templateUrl: './my-campaigns.component.html',
  styleUrls: ['./my-campaigns.component.scss'],
})
export class MyCampaignsComponent {
  campaigns$!: Observable<Campaign[] | undefined>;
  types$!: Observable<Type[]>;
  currentUser: User = EMPTY_USER;
  createCampaignRoute: string = '/' + CREATE_CAMPAIGN_ROUTE;

  constructor(
    private campaignService: CampaignService,
    private dialog: MatDialog,
    private sessionState: SessionStateService,
    private router: Router
  ) {
    sessionState.getCurrentUser$().subscribe({
      next: (session) => {
        if (session.accessToken !== '') {
          this.types$ = campaignService.getTypes();
          this.campaigns$ = campaignService.getByOwner(session.user);
          this.currentUser = session.user;
        }
      },
    });
  }

  public showNotAuthenticatedDialog(): void {
    const deleteMessage: string =
      'Your account will be deleted permanently. Are you sure?';
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: {
        message: 'You need to log in before any action.',
        route: LOGIN_ROUTE,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result === true) {
        }
      },
    });
  }

  public onDeleteCampaign(campaign: Campaign): void {
    this.campaignService.delete(campaign);
    this.router.navigateByUrl('/' + CAMPAIGNS_BASE_ROUTE);
  }
}
