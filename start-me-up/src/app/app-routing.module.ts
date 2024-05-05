import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { CampaignComponent } from './campaign/campaign.component';
import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  CAMPAIGNS_BASE_ROUTE,
  USER_PROFILE_ROUTE,
} from './routes';
const routes: Routes = [
  { path: '', redirectTo: LOGIN_ROUTE, pathMatch: 'full' },
  { path: CAMPAIGNS_BASE_ROUTE, component: CampaignComponent },

  { path: LOGIN_ROUTE, component: LoginComponent },
  {
    path: REGISTER_ROUTE,
    loadChildren: () =>
      import('./auth/register/register.module').then((m) => m.RegisterModule),
  },
  { path: USER_PROFILE_ROUTE, component: UserDetailComponent },
  {
    path: CAMPAIGNS_BASE_ROUTE,
    loadChildren: () =>
      import('./campaign/campaign.module').then((m) => m.CampaignModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
