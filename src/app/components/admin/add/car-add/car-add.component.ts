import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ComponentLoader } from 'ngx-bootstrap/component-loader';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
FormGroup


@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  brands: Brand[] = [];
  colors: Color[] = [];
  carAddForm: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService: ToastrService,
    
    
    ) { }

  
  ngOnInit(): void {
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      modelName:["",Validators.required],
      findex:["",Validators.required]
    })
  }

  addCar(){
    if(this.carAddForm.valid){let carModel = Object.assign({},this.carAddForm.value)
  this.carService.addCar(carModel).subscribe(response=>{
     this.toastrService.success(response.message,"Successfull")
  }, responseError=>{
    if(responseError.error.Errors.length>0){
        for (let i = 0; i < responseError.error.Errors.length; i++) {
        this.toastrService.error(responseError.error.Errors[i].ErrorMessage," Validation Failure Occured");        
      }
    }
    
})
}
    else{
      this.toastrService.error("Form has absent values.")
    }
  }
}
