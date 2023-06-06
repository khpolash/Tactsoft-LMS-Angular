import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontendComponent } from './layout/frontend/frontend.component';
import { AdminComponent } from './layout/admin/admin.component';


const routes: Routes = [
  {
    path:'',
    component:FrontendComponent,
    loadChildren:()=>import('./modules/frontend/frontend.module').then(m=>m.FrontendModule)
  },
  {
    path:'admin',
    component:AdminComponent,
    loadChildren:()=>import('./modules/admin/admin.module').then(x=>x.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
