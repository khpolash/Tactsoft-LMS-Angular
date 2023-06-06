import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminNavs } from 'src/app/features/configs/route.config';

const routes: Routes = [];


adminNavs.forEach((element) => {
  routes.push({
    path: element.path,
    component: element.component,
    redirectTo: element.redirectTo,
    pathMatch: element.pathMatch,
    data: element.data,
    // children: element.children,
  });

});


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
