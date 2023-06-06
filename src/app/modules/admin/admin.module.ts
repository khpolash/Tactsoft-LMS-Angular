import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { CountryListComponent } from './country/country-list/country-list.component';
import { CountryCreateUpdateComponent } from './country/country-create-update/country-create-update.component';
import { StateCreateUpdateComponent } from './state/state-create-update/state-create-update.component';
import { StateListComponent } from './state/state-list/state-list.component';
import { CityListComponent } from './city/city-list/city-list.component';
import { CityCreateUpdateComponent } from './city/city-create-update/city-create-update.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCreateUpdateComponent } from './category/category-create-update/category-create-update.component';
import { AvatarPipe } from 'src/app/core/pipe/avatar.pipe';
import { CarouselListComponent } from './carousel/carousel-list/carousel-list.component';
import { CarouselCreateUpdateComponent } from './carousel/carousel-create-update/carousel-create-update.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CountryListComponent,
    CountryCreateUpdateComponent,
    StateCreateUpdateComponent,
    StateListComponent,
    CityListComponent,
    CityCreateUpdateComponent,
    CategoryListComponent,
    CategoryCreateUpdateComponent,
    AvatarPipe,
    CarouselListComponent,
    CarouselCreateUpdateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
  ]
})
export class AdminModule { }
