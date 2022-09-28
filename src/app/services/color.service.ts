import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl="https://localhost:44355/api/colors/";
  constructor(private httpClient: HttpClient) { }

  getColors():Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"getall");
    }
    addColor(color: Color):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"add",color)
    }
    deleteColor(color:Color):Observable<ResponseModel>{
    
      let newPath=this.apiUrl+"Colors/Delete"
       return this.httpClient.post<ResponseModel>(newPath,color)
   
     }
   
     updateColor(color:Color):Observable<ResponseModel>{
       let newPath = this.apiUrl + "Colors/Update"
       return this.httpClient.post<ResponseModel>(newPath,color);
     }
}




  
