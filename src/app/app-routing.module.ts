import { CarAddComponent } from './components/admin/add/car-add/car-add.component';
import { BrandAddComponent } from './components/admin/add/brand-add/brand-add.component';
import { ColorAddComponent } from './components/admin/add/color-add/color-add.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailDtoComponent } from './components/car-detail-dto/car-detail-dto.component';
import { CarComponent } from './components/car/car.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandEditComponent } from './components/admin/edit/brand-edit/brand-edit.component';
import { ColorEditComponent } from './components/admin/edit/color-edit/color-edit.component';
import { CarEditComponent } from './components/admin/edit/car-edit/car-edit.component';

import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brands/:brandId', component: CarComponent },
  { path: 'cars/colors/:colorId', component: CarComponent },
  { path: 'cars/brand:brandId/color:colorId', component: CarComponent },
  { path: 'cars/cardetail/:carId', component: CarDetailDtoComponent },
  { path: 'cardetails/payment', component: PaymentComponent },

  {
    path: 'admin/cars/add',
    component: CarAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'admin/brands/add',
    component: BrandAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'admin/colors/add',
    component: ColorAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'admin/brands/update',
    component: BrandEditComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'admin/colors/update',
    component: ColorEditComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'admin/cars/update',
    component: CarEditComponent,
    canActivate: [LoginGuard],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
