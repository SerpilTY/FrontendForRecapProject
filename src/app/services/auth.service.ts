import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { CustomerService } from './customer.service';
import {LocalStorageService} from './local-storage.service';


@Injectable({ 
  providedIn: 'root'
})
export class AuthService {
  user: User
  token :string | null= ""  
  decodedTokenKey: any;
  

  apiUrl='https://localhost:44355/api/Auth/'

  constructor(private httpClient: HttpClient,
    private customerService: CustomerService,
    private jwtHelper: JwtHelperService,
    private localStorageService: LocalStorageService,


    ) { }


  decodedToken(token: any) {
    return this.jwtHelper.decodeToken(token);
  }
  loggedIn() {

    if (this.localStorageService.getToken()) {
      return this.jwtHelper.isTokenExpired();
    } else {
      return false;
    }
  }

  getUser() {
    let decodedToken = this.decodedToken(this.localStorageService.getToken());
    console.log(decodedToken)

    if (decodedToken) {
      if(this.loggedIn()){

        let tokenInfoName = Object.keys(decodedToken).filter(u => u.endsWith('/name'))[0];
        let userName = String(decodedToken[tokenInfoName]);

        let tokenInfoId = Object.keys(decodedToken).filter(u => u.endsWith('/nameidentifier'))[0];
        let userId = Number(decodedToken[tokenInfoId]);

        let claimInfo = Object.keys(decodedToken).filter(u => u.endsWith('/role'))[0];
        let roles = decodedToken[claimInfo];


        let tokenInfoEmail = decodedToken.email;

        this.user = {
          userName: userName,
          userId: userId,
          email: tokenInfoEmail,
          roles: roles,
          companyName :"",
          customerId : 0
        };
       
        this.getCustomerbyUserId(userId);
      }
    }
    return this.user;
  }
  
  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, loginModel);
  }

  getCustomerbyUserId(userId : number){
    this.customerService.getCustomerByUserId(userId).subscribe(response =>{
      console.log(response.data);
      this.user.customerId = response.data.customerId ;
      this.user.companyName = response.data.companyName;
    })
  }

  isAdmin() {
    let isAdmin = false
    if (this.loggedIn()) {
      let claims = this.user.roles?.toString().split(',') 

      claims?.map(role => {
        if (role.toLocaleLowerCase().indexOf("admin") !== -1) {
          isAdmin = true;
        }
      })
    }
    return isAdmin;
  }
}