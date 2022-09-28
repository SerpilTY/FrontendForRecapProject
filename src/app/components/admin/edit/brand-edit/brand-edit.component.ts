import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/models/brand';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConnectableObservable } from 'rxjs';



@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {

  constructor(private brandService:BrandService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService
    ) { }

    brands:Brand[]=[];
    brand:Brand;
    brandDeleteFormGroup:FormGroup;
    brandUpdateForm:FormGroup;

  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.createBrandDeleteForm();
  }

  ngDoCheck(){
    if(this.brand !==this.brandService.currentBrand){
      this.brand=this.brandService.currentBrand;
      this.brandUpdateForm.patchValue(this.brand)
    }
  }

  createBrandDeleteForm(){
    this.brandUpdateForm=this.formBuilder.group({
      brandId:['',Validators.required],
      brandName:['',Validators.required]
    })
  }

  createBrandUpdateForm(){
    this.brandUpdateForm=this.formBuilder.group({
      brandId:["",Validators.required],
      brandName:["", Validators.required]

    })
  }

  updateBrand(){
    console.log(this.brandUpdateForm.value);
    if(this.brandUpdateForm.valid){
      let brandModel=Object.assign({}, this.brandUpdateForm.value);
      this.brandService.updateBrand(brandModel).subscribe(response => {
        console.log(brandModel);
        this.toastrService.success("Brand Updated");
        window.location.reload();
      })
    }else{
      this.toastrService.error("Update Failed")
    }
  }

}
