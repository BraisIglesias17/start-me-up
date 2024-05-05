import { Injectable } from '@angular/core';
import { Campaign } from 'src/app/model/campaign.model';
import { Donation } from 'src/app/model/donation.model';
import { User } from 'src/app/model/user.model';
import { ENDPOINT } from '../constantes';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CampaignService } from './campaign.service';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  private url: string = ENDPOINT + 'donations';

  private donations: Donation[] = [];

  constructor(
    private httpClient: HttpClient,
    private campaignService: CampaignService
  ) {}

  public getAll(): Observable<Donation[]> {
    if (this.donations.length !== 0) {
      return of(this.donations);
    }
    return this.httpClient
      .get<Donation[]>(this.url)
      .pipe(tap((res) => (this.donations = res)));
  }

  public create(
    campaign: Campaign,
    donation: number,
    user: User
  ): Observable<Donation> {
    this.donations.push({ id: 1, user, campaign, amount: donation });
    campaign.totalRaised += donation;
    this.campaignService.update(campaign);
    return of({ id: 1, user, campaign, amount: donation });
  }
}
