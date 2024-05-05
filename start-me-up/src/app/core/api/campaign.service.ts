import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ENDPOINT } from '../constantes';
import {
  Campaign,
  CampaignCategory,
  EMPTY_CAMPAIGN,
  EMPTY_TYPE,
  Type,
} from 'src/app/model/campaign.model';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private url: string = ENDPOINT + 'campaings';

  private campaigns: Campaign[] = [];
  private types: Type[] = [];
  private categories: CampaignCategory[] = [];

  constructor(private httpClient: HttpClient) {}

  public loadCampaigns(): Observable<Campaign[]> {
    return this.httpClient
      .get<Campaign[]>(this.url)
      .pipe(tap((res) => (this.campaigns = res)));
  }

  public getAll(): Observable<Campaign[]> {
    if (this.campaigns.length !== 0) {
      return of(this.campaigns);
    }
    return this.httpClient
      .get<Campaign[]>(this.url)
      .pipe(tap((res) => (this.campaigns = res)));
  }

  public getFiltered(
    name: string = '',
    type: Type = EMPTY_TYPE
  ): Observable<Campaign[]> {
    return this.httpClient.get<Campaign[]>(this.url).pipe(
      map((response) => {
        return response.filter(
          (campaign) =>
            (name === '' || campaign.title.includes(name)) &&
            (type === EMPTY_TYPE || campaign.type === type)
        );
      })
    );
  }

  public createCampaign(campaign: Campaign): Observable<Campaign> {
    //sin persistencia
    //return this.httpClient.post<Campaign>(this.url, campaign);
    this.campaigns.push(campaign);
    return of(campaign);
  }

  public getById(id: string): Observable<Campaign | undefined> {
    if (this.campaigns.length !== 0) {
      return of(
        this.campaigns.find((camp) => {
          return camp.id == id;
        })
      ).pipe(tap((campaign) => console.log(campaign)));
    }
    return this.httpClient
      .get<Campaign>(this.url + '/' + id)
      .pipe(map((response) => response || EMPTY_CAMPAIGN));
  }

  public getByOwner(owner: User): Observable<Campaign[] | undefined> {
    if (this.campaigns.length !== 0) {
      return of(
        this.campaigns.filter((campaign) => campaign.user.id === owner.id)
      );
    }
    return this.httpClient
      .get<Campaign[]>(this.url)
      .pipe(
        map((response) =>
          response.filter((campaign) => campaign.user.id === owner.id)
        )
      );
  }

  public rate(campaign: Campaign, rate: number, user: User) {
    campaign.punctuation = (campaign.punctuation + rate) / 2;
    return this.update(campaign);
  }

  public delete(campaign: Campaign): Observable<Campaign | undefined> {
    if (this.campaigns.length !== 0) {
      this.campaigns = this.campaigns.filter((cmp) => cmp.id !== campaign.id);
      return of(campaign);
    }
    return this.httpClient.delete<Campaign>(this.url + '/' + campaign.id);
  }

  public update(campaign: Campaign): Observable<Campaign> {
    if (this.campaigns.length > 0) {
      for (let i = 0; i < this.campaigns.length; i++) {
        if (this.campaigns[i].id === campaign.id) {
          this.campaigns[i] = campaign;
          return of(campaign);
        }
      }
    }
    return this.httpClient.put<Campaign>(this.url, campaign);
  }
  public getTypes(): Observable<Type[]> {
    return this.httpClient
      .get<Type[]>(ENDPOINT + 'type')
      .pipe(tap((types) => (this.types = types)));
  }

  public getCategories(): Observable<CampaignCategory[]> {
    if (this.categories.length !== 0) {
      return of(this.categories);
    }
    return this.httpClient
      .get<CampaignCategory[]>(ENDPOINT + 'category')
      .pipe(tap((categories) => (this.categories = categories)));
  }
}
