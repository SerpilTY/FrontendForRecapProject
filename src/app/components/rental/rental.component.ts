import { Component, Input, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { RentalService } from 'src/app/services/rental.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { PaymentService } from 'src/app/services/payment.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentalDetails: RentalDetailDto[] = [];
  dataLoaded = false;
  customerDetails:Customer[] = [];
  rentDate:Date;
  returnDate:Date; 
  message:string|null;
  minDate:string|null;
  maxDate:string|null;
  firstDateSelected:boolean= false; 
  state:number = 1;
  customerId:number;
  @Input() carforRent:CarDetailDto
  

  constructor(private rentalService: RentalService,
    private customerService: CustomerService,
    private paymentService: PaymentService,
    private datePipe: DatePipe,
    private router: Router,
    //private modalService:NgbModal,
    //private activeModal:NgbModal ,
    private toastrService: ToastrService,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.getRentals();
    this.getCustomerDetails();
    this.minDate=new Date().toISOString().split("T")[0];
    this.rentDate = new Date(this.minDate);
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentalDetails= response.data;
      this.dataLoaded = true;
    });
  }

  getCustomerDetails() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customerDetails = response.data;
    });
  }

  addRentalCar() {
    let rental :Rental={
      carId: this.carforRent.carId,
      customerId:this.authService.user.customerId,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      
    };
    
      this.paymentService.setRental(rental);
      this.toastrService.success('Your request has been received, you are being directed to payment.');
      console.log("Request created")
        this.state =2;

  }


  onChangeEvent(event: any){
    this.minDate = event.target.value
    this.firstDateSelected = true
  }


  checkReturnDate(){
    if (this.returnDate < this.rentDate) {
      this.returnDate = this.rentDate
    }
  }

  totalAmount(){
    let differance = new Date(this.returnDate).getTime() - new Date(this.rentDate).getTime();
    let amount = new Date(differance).getDate();
    this.paymentService.totalPrice = amount * this.carforRent.dailyPrice;
  }
}

 
  

