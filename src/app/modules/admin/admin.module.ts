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
import { AllEventCreateUpdateComponent } from './allEvent/all-event-create-update/all-event-create-update.component';
import { AllEventListComponent } from './allEvent/all-event-list/all-event-list.component';
import { ClassRoomListComponent } from './classRoom/class-room-list/class-room-list.component';
import { ClassRoomCreateUpdateComponent } from './classRoom/class-room-create-update/class-room-create-update.component';
import { TrainerListComponent } from './trainer/trainer-list/trainer-list.component';
import { TrainerCreateUpdateComponent } from './trainer/trainer-create-update/trainer-create-update.component';
import { VenueListComponent } from './venue/venue-list/venue-list.component';
import { VenueCreateUpdateComponent } from './venue/venue-create-update/venue-create-update.component';


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
    CarouselCreateUpdateComponent,
    AllEventCreateUpdateComponent,
    AllEventListComponent,
    ClassRoomListComponent,
    ClassRoomCreateUpdateComponent,
    TrainerListComponent,
    TrainerCreateUpdateComponent,
    VenueListComponent,
    VenueCreateUpdateComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
  ]
})
export class AdminModule { }
