import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { Card } from 'src/app/models/card';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @Input() customer: number;

  paymentAddForm: FormGroup;
  savedCards: Card[];
  currentCard:Card;

  checked:boolean 
  totalPrice = this.paymentService.totalPrice;



  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,   
    private cardService: CardService,
    private paymentService:PaymentService,
   
    
  ) { }

  ngOnInit(): void {
    this.createPaymentAddForm();
    this.getCardsByCustomer();
  }

  createPaymentAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      customerId: [this.authService.user.customerId],
      nameOnTheCard: ['', Validators.required],
      cardNumber: ['', Validators.required],
      dateMonth: ['', Validators.required],
      dateYear: ['', Validators.required],
      cvvCode: ['', Validators.required],
    });
  }

  getCardsByCustomer(){
    this.cardService.getCardsByCustomer(this.authService.user.customerId).subscribe(response=>{
      this.savedCards = response.data
      console.log(response)
    })
  }
 
  getCardInfos(e:any){
    this.currentCard = this.savedCards.filter(x=> x.cardId == e.target.value)[0]
    this.paymentAddForm.patchValue(this.currentCard)
  }


  
  changeEvent(){
    if (this.checked ===true){
      this.paymentService.cardAddRequest = true;
    }else{
      this.paymentService.cardAddRequest = false;
    }
    return this.paymentService.cardAddRequest;
  }

completeThePayProcess() {
  if (this.paymentAddForm.valid) {
    let cardModel = Object.assign({}, this.paymentAddForm.value);
    this.paymentService.addRentalAfterPaymentAndCardInfoCompleted(cardModel);
  }
}


}