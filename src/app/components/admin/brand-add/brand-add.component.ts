import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
FormGroup

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private brandService:BrandService
    ) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
      brandName:["",Validators.required]      
    })
  }

  addBrand(){
    if(this.brandAddForm.valid){let brandModel = Object.assign({},this.brandAddForm.value)
  this.brandService.addBrand(brandModel).subscribe(response=>{
    console.log(response);
    this.toastrService.success(response.message,"Successful")
  })
}
    else{
      this.toastrService.error("Form has absent values.")

    }
  }

}
