import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent implements OnInit {

  colors: Color[] = [];
  color: Color;
  colorUpdateForm: FormGroup;

  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      
    });
  }
  getColor(color: Color) {
    this.color = color;
    this.colorUpdateForm.patchValue({
      colorId: this.color.colorId,
    });
  }
  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [''],
      colorName: ['', Validators.required],
    });
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
   
      this.colorService.updateColor(colorModel).subscribe(
        (response) => {
          
          this.toastrService.success(response.message, 'güncellendi');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          
        },
        (responseError) => {
          this.toastrService.error('güncellenemedi');
        }
      );
    }
  }

  removeColor(color: Color) {
    this.colorService.deleteColor(color).subscribe(
      (response) => {
        this.toastrService.success('silindi');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      },
      (responseError) => {
        this.toastrService.error(responseError.errors, 'renk silinemedi');
      }
    );
  }
}
