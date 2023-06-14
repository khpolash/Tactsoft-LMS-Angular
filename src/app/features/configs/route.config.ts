import { DashboardComponent } from 'src/app/modules/admin/dashboard/dashboard.component';
import { HomeComponent } from 'src/app/modules/frontend/home/home.component';
import { FrontRoute } from './front-route';
import { ContactComponent } from 'src/app/modules/frontend/contact/contact.component';
import { AboutUsComponent } from 'src/app/modules/frontend/about-us/about-us.component';
import { CoursesComponent } from 'src/app/modules/frontend/courses/courses.component';
import { StudentsComponent } from 'src/app/modules/frontend/students/students.component';
import { OurServicesComponent } from 'src/app/modules/frontend/our-services/our-services.component';
import { TermsConditionComponent } from 'src/app/modules/frontend/terms-condition/terms-condition.component';
import { SupportComponent } from 'src/app/modules/frontend/support/support.component';
import { CountryListComponent } from 'src/app/modules/admin/country/country-list/country-list.component';
import { CountryCreateUpdateComponent } from 'src/app/modules/admin/country/country-create-update/country-create-update.component';
import { StateListComponent } from 'src/app/modules/admin/state/state-list/state-list.component';
import { StateCreateUpdateComponent } from 'src/app/modules/admin/state/state-create-update/state-create-update.component';
import { CityListComponent } from 'src/app/modules/admin/city/city-list/city-list.component';
import { CityCreateUpdateComponent } from 'src/app/modules/admin/city/city-create-update/city-create-update.component';
import { CategoryListComponent } from 'src/app/modules/admin/category/category-list/category-list.component';
import { CategoryCreateUpdateComponent } from 'src/app/modules/admin/category/category-create-update/category-create-update.component';
import { CarouselListComponent } from 'src/app/modules/admin/carousel/carousel-list/carousel-list.component';
import { CarouselCreateUpdateComponent } from 'src/app/modules/admin/carousel/carousel-create-update/carousel-create-update.component';
import { AllEventListComponent } from 'src/app/modules/admin/allEvent/all-event-list/all-event-list.component';
import { AllEventCreateUpdateComponent } from 'src/app/modules/admin/allEvent/all-event-create-update/all-event-create-update.component';
import { TrainerListComponent } from 'src/app/modules/admin/trainer/trainer-list/trainer-list.component';
import { TrainerCreateUpdateComponent } from 'src/app/modules/admin/trainer/trainer-create-update/trainer-create-update.component';
import { VenueListComponent } from 'src/app/modules/admin/venue/venue-list/venue-list.component';
import { VenueCreateUpdateComponent } from 'src/app/modules/admin/venue/venue-create-update/venue-create-update.component';
import { ClassRoomListComponent } from 'src/app/modules/admin/classRoom/class-room-list/class-room-list.component';
import { ClassRoomCreateUpdateComponent } from 'src/app/modules/admin/classRoom/class-room-create-update/class-room-create-update.component';
import { TrainerComponent } from 'src/app/modules/frontend/trainer/trainer.component';


const frontRoute = FrontRoute;

export const adminNavs = [

  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { name: "Dashboard", path: frontRoute.dashboard, component: DashboardComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },

  { name: "Country", path: frontRoute.countryList, component: CountryListComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },
  { name: "Country Create", path: frontRoute.countryCreate, component: CountryCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },
  { name: "Country Edit", path: frontRoute.countryEdit, component: CountryCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },

  { name: "State", path: frontRoute.stateList, component: StateListComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },
  { name: "State Create", path: frontRoute.stateCreate, component: StateCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },
  { name: "State Edit", path: frontRoute.stateEdit, component: StateCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },

  { name: "City", path: frontRoute.cityList, component: CityListComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },
  { name: "City Create", path: frontRoute.cityCreate, component: CityCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },
  { name: "City Edit", path: frontRoute.cityEdit, component: CityCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },

  { name: "Category", path: frontRoute.categoryList, component: CategoryListComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },
  { name: "Category Create", path: frontRoute.categoryCreate, component: CategoryCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },
  { name: "Category Edit", path: frontRoute.categoryEdit, component: CategoryCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },

  { name: "Carousel", path: frontRoute.carouselList, component: CarouselListComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },
  { name: "Carousel Create", path: frontRoute.carouselCreate, component: CarouselCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },
  { name: "Carousel Edit", path: frontRoute.carouselEdit, component: CarouselCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },

  { name: "Event", path: frontRoute.allEventList, component: AllEventListComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },
  { name: "Event Create", path: frontRoute.allEventCreate, component: AllEventCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },
  { name: "Event Edit", path: frontRoute.allEventEdit, component: AllEventCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },

  { name: "Trainer", path: frontRoute.trainerList, component: TrainerListComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },
  { name: "Trainer Create", path: frontRoute.trainerCreate, component: TrainerCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },
  { name: "Trainer Edit", path: frontRoute.trainerEdit, component: TrainerCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },

  { name: "Venue", path: frontRoute.venueList, component: VenueListComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },
  { name: "Venue Create", path: frontRoute.venueCreate, component: VenueCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },
  { name: "Venue Edit", path: frontRoute.venueEdit, component: VenueCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },

  { name: "Class Roomn", path: frontRoute.classRoomList, component: ClassRoomListComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },
  { name: "Class Roomn Create", path: frontRoute.classRoomCreate, component: ClassRoomCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },
  { name: "Class Roomn Edit", path: frontRoute.classRoomEdit, component: ClassRoomCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },


];

export const frontendNavs = [

  { path: "", redirectTo: "home", pathMatch: "full" },
  { name: "Home", path: frontRoute.home, component: HomeComponent, icon: "home", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" } },
  { name: "Courses", path: frontRoute.courses, component: CoursesComponent, icon: "home", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" } },
  { name: "Students", path: frontRoute.students, component: StudentsComponent, icon: "home", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" } },
  { name: "Trainers", path: frontRoute.trainers, component: TrainerComponent, icon: "home", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" } },
  { name: "Contact", path: frontRoute.contact, component: ContactComponent, icon: "home", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" } },

];

export const footerNavs = [

  { path: "", redirectTo: "home", pathMatch: "full" },
  { name: "About Us", path: frontRoute.aboutUs, component: AboutUsComponent, icon: "code", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" }},
  { name: "Our Services", path: frontRoute.ourServices, component: OurServicesComponent, icon: "home", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" } },
  { name: "Terms & Condition", path: frontRoute.termsCondition, component: TermsConditionComponent, icon: "home", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" } },
  { name: "Support", path: frontRoute.support, component: SupportComponent, icon: "home", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" } },

];

