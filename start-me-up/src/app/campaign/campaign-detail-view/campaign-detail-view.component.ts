import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/core/api/campaign.service';
import { UtilsService } from 'src/app/core/utils.service';
import { Observable } from 'rxjs';
import { SessionStateService } from 'src/app/core/session-state.service';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import {
  Campaign,
  EMPTY_CAMPAIGN,
  EMPTY_TYPE,
} from 'src/app/model/campaign.model';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';
import { JoinCampaignDialogComponent } from '../join-campaign-dialog/join-campaign-dialog.component';
import { DonationService } from 'src/app/core/api/donation.service';
import { LOGIN_ROUTE } from 'src/app/routes';
import { RateCampaignDialogComponent } from '../rate-campaign-dialog/rate-campaign-dialog.component';
import { User, EMPTY_USER } from 'src/app/model/user.model';
import { CampaignActions } from '../state/campaign.actions';
import { CampaignQuery } from '../state/campaign.query';
import { of } from 'rxjs';

@Component({
  selector: 'app-campaign-detail-view',
  templateUrl: './campaign-detail-view.component.html',
  styleUrls: ['./campaign-detail-view.component.scss'],
})
export class CampaignDetailViewComponent {
  currentCampaign$!: Observable<Campaign | undefined>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private campaignServices: CampaignService,
    private utilService: UtilsService,
    private sessionState: SessionStateService,
    private donationService: DonationService,
    private dialog: MatDialog,
    private campaignActions: CampaignActions,
    private campaignQuery: CampaignQuery
  ) {
    const id = utilService.getParam(activatedRoute, 'id');
    if (id) {
      //this.currentCampaign$ = campaignServices.getById(id);
      this.initializeCampaign(id);
    }
  }

  private initializeCampaign(id: string): void {
    this.campaignActions.getById(id);
    this.currentCampaign$ = of(this.campaignQuery.getActive());
  }
  public onPunctuate(): void {
    this.sessionState
      .getCurrentUser$()
      .pipe(take(1))
      .subscribe({
        next: (session) => {
          if (session.accessToken === '') {
            this.showNotAuthenticatedDialog();
          } else {
            this.showRateDialog(session.user);
          }
        },
      });
  }

  public onParticipate(): void {
    this.sessionState
      .getCurrentUser$()
      .pipe(take(1))
      .subscribe({
        next: (session) => {
          if (session.accessToken === '') {
            this.showNotAuthenticatedDialog();
          } else {
            this.showJoinDialog(session.user);
          }
        },
      });
  }

  public showJoinDialog(user: User): void {
    this.currentCampaign$.pipe(take(1)).subscribe({
      next: (campaign) => {
        const dialogRef = this.dialog.open(JoinCampaignDialogComponent, {
          width: '300px',
          data: campaign,
        });

        dialogRef.afterClosed().subscribe({
          next: (result) => {
            if (result.response) {
              this.donationService.create(
                result.campaign,
                result.donation,
                user
              );
            }
          },
        });
      },
    });
  }

  public showRateDialog(user: User): void {
    this.currentCampaign$.pipe(take(1)).subscribe({
      next: (campaing) => {
        const dialogRef = this.dialog.open(RateCampaignDialogComponent, {
          width: '300px',
          data: campaing,
        });

        dialogRef.afterClosed().subscribe({
          next: (result) => {
            if (result.reponse) {
              this.campaignServices.rate(result.campaign, result.rate, user);
            }
          },
        });
      },
    });
  }

  public showNotAuthenticatedDialog(): void {
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
}
