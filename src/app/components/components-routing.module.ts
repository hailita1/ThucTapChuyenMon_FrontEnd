import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomepageComponent} from './homepage/homepage.component';
import {ComponentsComponent} from './components.component';
import {UserComponent} from './user/user.component';
import {HouseListComponent} from './user/house-list/house-list.component';
import {AddHouseComponent} from './user/add-house/add-house.component';
import {EditHouseComponent} from './user/edit-house/edit-house.component';
import {ShowDetailsComponent} from './homepage/show-details/show-details.component';
import {HomeListComponent} from './user/home-list/home-list.component';
import {ShowDetailHouseComponent} from './user/show-detail-house/show-detail-house.component';
import {LoginComponent} from './user/login/login.component';
import {ShowDetailUserComponent} from './user/show-detail-user/show-detail-user.component';
import {EditUserComponent} from './user/edit-user/edit-user.component';
import {SignUpComponent} from './user/sign-up/sign-up.component';
import {LoginHomepageComponent} from './homepage/login-homepage/login-homepage.component';
import {SignupHomepageComponent} from './homepage/signup-homepage/signup-homepage.component';
import {DealsComponent} from './homepage/deals/deals.component';
import {ShowDetailCustomerComponent} from './homepage/show-detail-customer/show-detail-customer.component';
import {CheckoutDealsComponent} from './homepage/checkout-deals/checkout-deals.component';
import {HistoryHouseComponent} from './user/history-house/history-house.component';
import {DeleteDealsComponent} from './homepage/delete-deals/delete-deals.component';
import {EditCustomerComponent} from './homepage/edit-customer/edit-customer.component';

const routes: Routes = [{ path: 'home', component: HomepageComponent },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'views/:id', component: ShowDetailsComponent},
  {path: 'deals', component: DealsComponent},
  {path: 'checkout-deals/:id', component: CheckoutDealsComponent},
  {path: 'delete-deals/:id', component: DeleteDealsComponent},
  {path: 'edit-customer/:id', component: EditCustomerComponent},
  {path: 'customer/:id', component: ShowDetailCustomerComponent},
  {path: 'history/:id', component: HistoryHouseComponent},
  {path: 'user/:id', component: HomeListComponent},
  {path: 'user/house/:id', component: HouseListComponent},
  {path: 'user/add/:id', component: AddHouseComponent},
  {path: 'user/house-details/:id', component: ShowDetailHouseComponent},
  {path: 'user/edit/:id', component: EditHouseComponent},
  {path: 'login-homepage', component: LoginHomepageComponent},
  {path: 'signup-host', component: SignUpComponent},
  {path: 'show-detail-user/:id', component: ShowDetailUserComponent},
  {path: 'edit-user/:id', component: EditUserComponent},
  {path: 'login-host', component: LoginComponent},
  {path: 'signup-homepage', component: SignupHomepageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
