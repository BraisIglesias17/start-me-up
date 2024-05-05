import { Component, Input } from '@angular/core';
import { CampaignService } from 'src/app/core/api/campaign.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/core/utils.service';
import { concatMap, map, tap } from 'rxjs/operators';
import { MergeDataEditCampaign } from '../campaign.types';
import { Observable, of } from 'rxjs';
import { Campaign, EMPTY_CAMPAIGN } from 'src/app/model/campaign.model';
import { OWN_CAMPAIGNS_ROUTE } from 'src/app/routes';
@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.scss'],
})
export class EditCampaignComponent {
  data$!: Observable<any>;
  constructor(
    private campaignService: CampaignService,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilsService,
    private router: Router
  ) {
    const id = utilService.getParam(activatedRoute, 'id');

    if (id) {
      this.data$ = campaignService.getById(id).pipe(
        concatMap((campaign) =>
          campaignService.getTypes().pipe(map((types) => ({ campaign, types })))
        ),
        concatMap(({ campaign, types }) =>
          campaignService.getCategories().pipe(
            map((categories) => {
              return { campaign, types, categories };
            })
          )
        )
      );
    }
  }

  public onEditCampaign(campaign: Campaign): void {
    this.campaignService.update(campaign).subscribe({
      next: (response) => {
        alert('Campaign succesfully updated ');
        this.router.navigateByUrl(OWN_CAMPAIGNS_ROUTE);
      },
      error: (error) => {
        alert('an error has ocurred');
      },
    });
  }
}
