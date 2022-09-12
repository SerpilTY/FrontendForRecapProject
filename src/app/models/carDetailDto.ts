export interface CarDetailDto {
    carId:number;
    brandId:number;
    colorId:number;
    modelName:string;
    imagePath:string[];
    brandName: string;
    colorName: string;
    modelYear: number;
    dailyPrice: number;
    description: string;
    isRentable:boolean;
  }