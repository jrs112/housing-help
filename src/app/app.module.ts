import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { DonorCreateComponent } from './donor-create/donor-create.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DonorDashboardComponent } from './donor-dashboard/donor-dashboard.component';
import { UserApiService } from "./services/user-api.service";
import { RequestApiService } from "./services/request-api.service";
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminSubmitRequestComponent } from './admin-submit-request/admin-submit-request.component';
import { RequestViewOneComponent } from './request-view-one/request-view-one.component';


@NgModule({
  declarations: [
    AppComponent,
    DonorCreateComponent,
    LandingPageComponent,
    DonorDashboardComponent,
    AdminCreateComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    HomePageComponent,
    AdminSubmitRequestComponent,
    RequestViewOneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)

  ],
  providers: [UserApiService, RequestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
