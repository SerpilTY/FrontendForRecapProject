import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailDtoComponent } from './components/car-detail-dto/car-detail-dto.component';
import { RentalDetailDtoComponent } from './components/rental-detail-dto/rental-detail-dto.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginComponent } from './components/login/login.component';
import { DatePipe } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    NaviComponent,
    CarDetailDtoComponent,
    RentalDetailDtoComponent,
    CarImageComponent,
    CarFilterPipe,
    ColorFilterPipe,
    BrandFilterPipe,
    PaymentComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter, 
        allowedDomains: ['http://localhost:4200/'],
      },
    }),

    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
