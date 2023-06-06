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

const frontRoute = FrontRoute;

export const adminNavs = [

  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { name: "Dashboard", path: frontRoute.dashboard, component: DashboardComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },

  { name: "Country List", path: frontRoute.countryList, component: CountryListComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },
  { name: "Country Create", path: frontRoute.countryCreate, component: CountryCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },
  { name: "Country Edit", path: frontRoute.countryEdit, component: CountryCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },

  { name: "State List", path: frontRoute.stateList, component: StateListComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },
  { name: "State Create", path: frontRoute.stateCreate, component: StateCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },
  { name: "State Edit", path: frontRoute.stateEdit, component: StateCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },

  { name: "City List", path: frontRoute.cityList, component: CityListComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },
  { name: "City Create", path: frontRoute.cityCreate, component: CityCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },
  { name: "City Edit", path: frontRoute.cityEdit, component: CityCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },

  { name: "Category List", path: frontRoute.categoryList, component: CategoryListComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },
  { name: "Category Create", path: frontRoute.categoryCreate, component: CategoryCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },
  { name: "Category Edit", path: frontRoute.categoryEdit, component: CategoryCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },

  { name: "Carousel List", path: frontRoute.carouselList, component: CarouselListComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Dashboard" } },
  { name: "Carousel Create", path: frontRoute.carouselCreate, component: CarouselCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },
  { name: "Carousel Edit", path: frontRoute.carouselEdit, component: CarouselCreateUpdateComponent, icon: "dashboard", active: true, title: "", priority: 1, menu: false, data: { breadcrumb: "Dashboard" } },


];

export const frontendNavs = [

  { path: "", redirectTo: "home", pathMatch: "full" },
  { name: "Home", path: frontRoute.home, component: HomeComponent, icon: "home", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" } },
  { name: "Courses", path: frontRoute.courses, component: CoursesComponent, icon: "home", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" } },
  { name: "Students", path: frontRoute.students, component: StudentsComponent, icon: "home", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" } },
  { name: "Contact", path: frontRoute.contact, component: ContactComponent, icon: "home", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" } },

];

export const footerNavs = [

  { path: "", redirectTo: "home", pathMatch: "full" },
  { name: "About Us", path: frontRoute.aboutUs, component: AboutUsComponent, icon: "code", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" }},
  { name: "Our Services", path: frontRoute.ourServices, component: OurServicesComponent, icon: "home", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" } },
  { name: "Terms & Condition", path: frontRoute.termsCondition, component: TermsConditionComponent, icon: "home", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" } },
  { name: "Support", path: frontRoute.support, component: SupportComponent, icon: "home", active: true, title: "", priority: 1, menu: true, data: { breadcrumb: "Home" } },

];

