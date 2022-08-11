import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carDetails: CarDetailDto[]=[];
  carImage: CarImage[]=[];
  imageUrl:string="https://localhost:44355/Uploads/images/" 
  dataLoaded = false;

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {

      if(params["colorId"]&&params["brandId"]){
        
        this.getCarsDetailByBrandAndColorId(params["colorId"],params["brandId"])
      
      }else if(params["brandId"]){
        this.getCarsByBrandId(params["brandId"])
      
      }else if(params["colorId"]){
        this.getCarsByColorId(params["colorId"])
      
      }else{
        this.getCars();
      }

    })
  }
  
  getCars() {
    this.carService.getCars().subscribe(response=>{
      this.carDetails=response.data;
      this.dataLoaded= true;
    })

  }

  getCarsDetailByBrandAndColorId(brandId:number, colorId:number) {
    this.carService.getCarsDetailByBrandAndColorId(colorId, brandId).subscribe(response=>{
      console.log(response)
      this.carDetails=response.data;
      this.dataLoaded= true;     
    })

  }

  getCarsByBrandId(brandId:number) {
    this.carService.getCarsByBrandId(brandId).subscribe(response=>{
      this.carDetails=response.data;
      this.dataLoaded= true;     
    })

  }
  getCarsByColorId(colorId:number) {
    this.carService.getCarsByColorId(colorId).subscribe(response=>{
      this.carDetails=response.data;
      this.dataLoaded= true;

      
    })
  }
}