export interface RentalDetailDto{
    rentalId:number;
    carId:number;
    customerId:number;
    rentDate:Date;
    returnDate:Date;
    customerFirstName:string;
    customerLastName:string;
    companyName:string;
    modelName:string;
    colorName:string;
    brandName:string;
}