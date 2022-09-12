import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarDetailDtoService } from 'src/app/services/cardetaildto.service';
import { CarImageService } from 'src/app/services/carimage.service';
import { AuthService } from 'src/app/services/auth.service';

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


  constructor(
    private carImageService: CarImageService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService ) { }

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

  isAuthenticated(){
    return this.authService.loggedIn()
  }

}

