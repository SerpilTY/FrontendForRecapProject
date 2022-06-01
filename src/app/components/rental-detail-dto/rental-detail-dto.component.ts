import { Component, OnInit } from '@angular/core';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { RentalDetailDtoService } from 'src/app/services/rentaldetaildto.service';

@Component({
  selector: 'app-rental-detail-dto',
  templateUrl: './rental-detail-dto.component.html',
  styleUrls: ['./rental-detail-dto.component.css'],
})
export class RentalDetailDtoComponent implements OnInit {
  rentalDetailDtos: RentalDetailDto[] = [];
  dataLoaded = false;

  //rentalResponseModel: RentalResponseModel;
  constructor(private rentalDetailDtoService: RentalDetailDtoService) {}

  ngOnInit(): void {
    this.getRentalDetailDtos();
  }

  getRentalDetailDtos() {
    this.rentalDetailDtoService.getRentalDetailDtos().subscribe((response) => {
      this.rentalDetailDtos = response.data;
      this.dataLoaded = true;
    });
  }
}

