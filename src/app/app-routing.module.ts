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


const routes: Routes = [
{path:"", pathMatch:"full", component:CarComponent},
{path:"cars", component: CarComponent},
{path:"cars/brands/:brandId", component: CarComponent},
{path:"cars/colors/:colorId", component: CarComponent},
{path:"cars/brand:brandId/color:colorId",component:CarComponent},
{path:"cars/cardetail/:carId",component:CarDetailDtoComponent},
{path:"cardetails/payment",component:PaymentComponent},

{path:"admin/cars/add",component:CarAddComponent},
{path:"admin/brands/add",component:BrandAddComponent},
{path:"admin/colors/add",component:ColorAddComponent},
{path:"admin/brands/update",component:BrandEditComponent},
{path:"admin/colors/update",component:ColorEditComponent},
{path:"admin/cars/update",component:CarEditComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
