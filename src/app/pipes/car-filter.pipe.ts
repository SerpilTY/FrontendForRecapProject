import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: CarDetailDto[], carDetailFilter:string): CarDetailDto[]{

    carDetailFilter=carDetailFilter?carDetailFilter.toLocaleLowerCase():""

    return carDetailFilter?value.filter((cd:CarDetailDto)=>
    cd.brandName.toLocaleLowerCase().indexOf(carDetailFilter)!==-1 ||
    cd.modelName.toLocaleLowerCase().indexOf(carDetailFilter)!==-1 ||
    cd.colorName.toLocaleLowerCase().indexOf(carDetailFilter)!==-1 ||
    cd.description.toString().indexOf(carDetailFilter)!==-1 ||
    cd.dailyPrice.toString().indexOf(carDetailFilter)!==-1 ):value;
  }

}
