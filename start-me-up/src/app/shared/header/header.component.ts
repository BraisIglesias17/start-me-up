import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserSession } from 'src/app/model/user.model';
import { SessionStateService } from 'src/app/core/session-state.service';
import { UserService } from 'src/app/core/api/user.service';
import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  CAMPAIGNS_BASE_ROUTE,
  OWN_CAMPAIGNS_ROUTE,
} from 'src/app/routes';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  loginRoute: string = LOGIN_ROUTE;
  registerRoute: string = REGISTER_ROUTE;
  listCampaingsRoute: string = CAMPAIGNS_BASE_ROUTE;
  ownCampaignsRoute: string = OWN_CAMPAIGNS_ROUTE;
  @Input() appTitle = 'Start me up';
  currentUser$!: Observable<UserSession>;

  constructor(private sessionState: SessionStateService) {
    this.currentUser$ = sessionState.getCurrentUser$();
  }
}
