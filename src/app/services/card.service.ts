import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { RentalService } from './rental.service';
import {Card} from '../models/card';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  apiUrl='https://localhost:44355/api/Cards/'

  constructor(private httpClient: HttpClient,
    private rentalService: RentalService,
    ) { }
  
  addCard(card: Card): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, card);
  }


  getCardsByCustomer(customerId: number): Observable<ListResponseModel<Card>> {
    let newPath = this.apiUrl + 'getcardsbycustomerid?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }
}