import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import {ColorService} from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carDetails: CarDetailDto[]=[];
  carImage: CarImage[]=[];
  colors:Color[]=[];
  colorFilter:number=0;
  brands:Brand[] = [];
  brandFilter:number=0;

  imageUrl:string="https://localhost:44355/Uploads/images/" 
  dataLoaded = false;

  constructor(private carService: CarService,
     private activatedRoute: ActivatedRoute,
     private brandService:BrandService,
     private colorService:ColorService
     ) {}

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {

      this.getAllBrands();
      this.getAllColors();

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

  getSelectedColor(colorId: number){
    if(this.colorFilter==colorId) return true;
    else return false; 
  }
  getSelectedBrand(brandId: number){
    if(this.brandFilter==brandId) return true;
    else return false; 
  }
 
  getAllColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      console.log(this.colors);
    });
  }

  getAllBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      console.log(this.brands);
    });
  }
}