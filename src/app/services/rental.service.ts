import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { RentalDetailDtoService } from './rentaldetaildto.service';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44355/api/rentals/getall";
  constructor(private httpClient: HttpClient) { }
  
  getRentals():Observable<ListResponseModel<RentalDetailDto>> {
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(this.apiUrl);
    }
    getCarRentalDetails(): Observable<ListResponseModel<RentalDetailDtoService>> {
      let newPath = this.apiUrl + 'getrentaldetails';
      return this.httpClient.get<ListResponseModel<RentalDetailDtoService>>(newPath);
    }

    addRental(rental:Rental): Observable<ResponseModel> {
      let newPath = this.apiUrl + 'Add'
      return this.httpClient.post<ResponseModel>(newPath, rental);
    }
}
