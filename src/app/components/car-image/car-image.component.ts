import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDtoService } from 'src/app/services/cardetaildto.service';
import { CarImageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {


  constructor(
    private CarDetailDtoService: CarDetailDtoService,
    private CarImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    public domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    
  }

}