import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendRoutingModule } from './frontend-routing.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CoursesComponent } from './courses/courses.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { StudentsComponent } from './students/students.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { SupportComponent } from './support/support.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { TrainerComponent } from './trainer/trainer.component';


@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    AboutUsComponent,
    CoursesComponent,
    StudentsComponent,
    TermsConditionComponent,
    SupportComponent,
    OurServicesComponent,
    TrainerComponent,
  ],
  imports: [
    CommonModule,
    FrontendRoutingModule,
    MaterialModule
  ]
})
export class FrontendModule { }
