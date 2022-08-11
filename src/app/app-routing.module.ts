import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailDtoComponent } from './components/car-detail-dto/car-detail-dto.component';
import { CarComponent } from './components/car/car.component';

const routes: Routes = [
{path:"", pathMatch:"full", component:CarComponent},
{path:"cars", component: CarComponent},
{path:"cars/brands/:brandId", component: CarComponent},
{path:"cars/colors/:colorId", component: CarComponent},
{path:"cars/brand/:brandId/color:colorId",component:CarComponent},
{path:"cars/cardetail/:carId",component:CarDetailDtoComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
