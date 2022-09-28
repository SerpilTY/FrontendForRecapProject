import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetailDto } from '../models/carDetailDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44355/api/";
  constructor(private httpClient: HttpClient) { }
  getCars():Observable<ListResponseModel<CarDetailDto>>{
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(
      this.apiUrl +'Cars/getcardetails'
      
      );
  }

  getCarsDetailsByCarId(carId:number):Observable<ListResponseModel<CarDetailDto>>{
    let newPath = this.apiUrl +"Cars/GetCardetailsByCarId?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<CarDetailDto>>{
  let newPath = this.apiUrl +"Cars/getbybrandId?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
  }
  getCarsByColorId(colorId:number):Observable<ListResponseModel<CarDetailDto>>{
    let newPath = this.apiUrl +"Cars/getbycolorId?colorId="+colorId;
      return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
    }
  getCarsDetailByBrandAndColorId(colorId:number,brandId:number):Observable<ListResponseModel<CarDetailDto>>{
    let newPath = this.apiUrl +"Cars/GetCarDetailsByColorAndByBrand?colorId="+colorId+ "&brandId=" +brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
  }

  addCar(car: CarDetailDto):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add", car)
  }
  updateCar(car:CarDetailDto): Observable<ResponseModel>{
    let newPath = this.apiUrl + 'cars/update';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  deleteCar(car:CarDetailDto): Observable<ResponseModel>{
    let newPath = this.apiUrl + 'cars/delete';
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

}