import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44355/api/customers/getall";
  constructor(private httpClient: HttpClient) { }
  
  getCustomers():Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl + 'Customers/GetAll');
    }

    getCustomerByUserId(userId:number) : Observable<SingleResponseModel<Customer>>{
      let newPath = this.apiUrl + "Customers/getbyuserid?userId=" + userId;
      return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
    }

   }




  

