import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {

  transform(value: Brand[] , brandFilter:string): Brand[] {
    brandFilter=brandFilter?brandFilter.toLocaleLowerCase():""

    return brandFilter?value.filter(
      (c:Brand)=>c.brandName.toLocaleLowerCase().indexOf(brandFilter)!==-1):value;
  }
  }


