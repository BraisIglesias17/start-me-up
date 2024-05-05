import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginFormComponent } from './auth/login/login-form/login-form.component';
import { MatButtonModule } from '@angular/material/button';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserDetailFormComponent } from './user/user-detail-form/user-detail-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ListDonationsComponent } from './donation/list-donations/list-donations.component';

//MATBUTTON STYLES NOT WORKING WITH SHARED MODULE

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent,
    UserDetailComponent,
    UserDetailFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SharedModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
