import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl="https://localhost:44355/api/";
currentBrand:Brand;
statusUpdated= new EventEmitter();

  constructor(private httpClient: HttpClient) { }
  
  getBrands():Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+'brands/getall');
    };

    getCarsByBrandId(brandId:number):Observable<ListResponseModel<Brand>> {
      let newPath=this.apiUrl+ "cars/brands/getbyid?id="+brandId;
      return this.httpClient.get<ListResponseModel<Brand>>(newPath);
      }
      
      addBrand(brand: Brand):Observable<ResponseModel>{
        return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/add", brand)
      }

      deleteBrand(brand:Brand): Observable<ResponseModel>{
        let newPath=this.apiUrl+ "brands/update";
        return this.httpClient.post<ResponseModel>(newPath, brand);
      }

      updateBrand(brand:Brand): Observable<ResponseModel>{
        let newPath=this.apiUrl+"brands/update";
        return this.httpClient.post<ResponseModel>(newPath, brand);
      }

      setCurrentBrand(brand: Brand){
        this.currentBrand = brand;
      }
}
