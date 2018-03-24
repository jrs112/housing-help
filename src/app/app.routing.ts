import { Routes } from '@angular/router';
import { DonorCreateComponent } from "./donor-create/donor-create.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { DonorDashboardComponent } from "./donor-dashboard/donor-dashboard.component";
import { AdminCreateComponent } from "./admin-create/admin-create.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminSubmitRequestComponent } from "./admin-submit-request/admin-submit-request.component";
import { RequestViewOneComponent } from "./request-view-one/request-view-one.component";

export const routes: Routes = [


  {
    path: 'donorsignup',
    component: DonorCreateComponent
  },
  {
    path: 'createadmin',
    component: AdminCreateComponent
  },
  {
    path: 'homeassist',
    component: LandingPageComponent
  },
  {
    path: 'donordashboard',
    component: DonorDashboardComponent
  },
  {
    path: 'admindashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'adminsubmitrequest',
    component: AdminSubmitRequestComponent
  },
  {
    path: 'viewrequest/:id/:first/:last/:email',
    component: RequestViewOneComponent
  },

  {
    path: 'adminlogin',
    component: AdminLoginComponent
  },
  {
    path: '',
    redirectTo: 'homeassist',
    pathMatch: 'full'
  },





];
