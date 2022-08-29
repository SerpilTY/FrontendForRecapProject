import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { AuthService } from './auth.service';
import { CardService } from './card.service';
import { RentalService } from './rental.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  rentals:Rental
  totalPrice:number;
  payment:Payment;
  apiUrl='https://localhost:44355/api/Payments/'
  cardAddRequest:boolean


  constructor(private httpClient: HttpClient,
    private rentalService: RentalService,
    private authService: AuthService,
    private cardService: CardService,
    private toastrService: ToastrService
    
    ) { }



    addPayment(payment: Payment): Observable<ResponseModel> {
      let newPath = this.apiUrl + 'add';
      return this.httpClient.post<ResponseModel>(newPath, payment);
    }
    
    setPaymentModel(card: Card) {
      this.payment = <Payment> {
        customerId: this.authService.user.customerId,
        cardNumber: card.cardNumber,
        totalAmount: this.totalPrice
      };
      return this.payment;
    
    }

    setRental(rental: Rental) {
      this.rentals = rental;
    }
    
    
    addRentalAfterPaymentAndCardInfoCompleted(card: Card) {
      if (this.cardAddRequest === true) {
        this.cardService.addCard(card).subscribe(response => {
          this.setPaymentModel(card);
          this.addPayment(this.payment).subscribe(response => {
            this.rentalService.addRental(this.rentals).subscribe(response => {
              this.toastrService.success('Success.');
            }, responseError => {
              this.toastrService.error(responseError.errors, 'You do not have enough Findex points to rent this car.');
            });
          });
        }, responseError => {
          this.toastrService.error('Invalid credit card informations.');
        });
      }else{
        //console.log("paymentte başladık")
        this.setPaymentModel(card);
        this.addPayment(this.payment).subscribe(response => {
          this.rentalService.addRental(this.rentals).subscribe(response => {
            this.toastrService.success('Success.');
            }, responseError => {
            this.toastrService.error(responseError.errors, 'You do not have enough Findex points to rent this car.');
          });
        })
      }
    }
}