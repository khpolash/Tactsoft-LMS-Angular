import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { footerNavs, frontendNavs } from 'src/app/features/configs/route.config';

const routes: Routes = [];

frontendNavs.forEach((element) => {
  routes.push({
    path: element.path,
    component: element.component,
    redirectTo: element.redirectTo,
    pathMatch: element.pathMatch,
    data: element.data,
    // children: element.children,
  });

});

footerNavs.forEach((element) => {
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
export class FrontendRoutingModule { }
