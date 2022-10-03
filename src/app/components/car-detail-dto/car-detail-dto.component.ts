import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarDetailDtoService } from 'src/app/services/cardetaildto.service';
import { CarImageService } from 'src/app/services/carimage.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RentalComponent } from '../rental/rental.component';
RentalComponent
ToastrService

@Component({
  selector: 'app-car-detail-dto',
  templateUrl: './car-detail-dto.component.html',
  styleUrls: ['./car-detail-dto.component.css'],
})
export class CarDetailDtoComponent implements OnInit {
  cars: CarDetailDto[] = [];
  carImagePaths:string[]=[];
  carDetail:CarDetailDto;
  carImages:CarImage[]=[];
  dataLoaded = false;
  imageUrl:string="https://localhost:44355/Uploads/images/"
  state:boolean=false;
  isFirstRender:boolean=true;


  constructor(
    private carImageService: CarImageService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService ,
    private toastrService: ToastrService,
    private router : Router,
    

    )
    { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['carId']){
          this.getCarsDetailsByCarId(params['carId'])
        }
    })

    
  }

  getCarsDetailsByCarId(carId:number) {
    this.carService.getCarsDetailsByCarId(carId).subscribe((response) => {
      this.cars = response.data;
      this.carDetail=response.data[0];
      this.carImagePaths=this.carDetail.imagePath;
      this.dataLoaded = true;
    });
  }

  isAdmin(){
    return this.authService.isAdmin()
  }


  deleteCar(){
    if (window.confirm("Are you sure?")){
      this.carService.deleteCar(this.carDetail).subscribe(response=>{

        this.toastrService.success('Car Deleted.')
        this.router.navigate(['/'])
      }, responseError=>{
        this.toastrService.error('Car Not Deleted.')
      })
    }
  }


  changeState(){
      this.state = !this.state;
  }

  showModal(){
    if(this.isFirstRender){
      this.isFirstRender=false;
      return true;
    }
    return false;
  }


  isAuthenticated(){
    return this.authService.loggedIn()
  }

}

