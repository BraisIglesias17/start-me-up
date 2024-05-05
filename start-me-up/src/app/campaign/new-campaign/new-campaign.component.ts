import { Component } from '@angular/core';
import { CampaignService } from 'src/app/core/api/campaign.service';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { MergeDataCampaign } from '../campaign.types';
import { SessionStateService } from 'src/app/core/session-state.service';

import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';
import { OWN_CAMPAIGNS_ROUTE } from 'src/app/routes';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/model/campaign.model';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss'],
})
export class NewCampaignComponent {
  data$: Observable<MergeDataCampaign>;
  constructor(
    private campaignService: CampaignService,
    private sessionState: SessionStateService,
    private dialog: MatDialog,
    private router: Router
  ) {
    // campaignService.getTypes().pipe(
    //   concatMap((types) =>
    //     campaignService
    //       .getCategories()
    //       .pipe(map((categories) => ({ types, categories })))
    //   ),
    //   concatMap(({types, categories}) =>
    //     sessionState
    //       .getCurrentUser$()
    //       .pipe(map((session) => ({ types, categories, user: session.user })))
    //   )
    // );
    this.data$ = campaignService.getTypes().pipe(
      concatMap((types) => {
        return campaignService.getCategories().pipe(
          concatMap((categories) => {
            return sessionState.getCurrentUser$().pipe(
              map((session) => ({
                types: types,
                categories,
                user: session.user,
              }))
            );
          })
        );
      })
    );
  }

  public onCreateCampaign(campaign: Campaign): void {
    //validacion

    this.campaignService.createCampaign(campaign).subscribe({
      next: (response) => {
        this.showDialog('Campaign succesfully created!');
      },
      error: (err) => {
        this.showDialog('A problem has ocurred');
      },
    });
  }

  public showDialog(message: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      //en la siguiente estructura la ruta está deprecada,t engo que cambiarlo
      data: {
        message: message,
        route: OWN_CAMPAIGNS_ROUTE,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result === true) {
          console.log('navigate to', OWN_CAMPAIGNS_ROUTE);
          this.router.navigateByUrl(OWN_CAMPAIGNS_ROUTE);
        }
      },
    });
  }
}
