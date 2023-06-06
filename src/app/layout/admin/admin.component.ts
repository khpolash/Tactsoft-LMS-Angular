import { Component } from '@angular/core';
import { adminNavs } from 'src/app/features/configs/route.config';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  navs = adminNavs.filter((e) => e.component !== undefined && e.menu);
}
