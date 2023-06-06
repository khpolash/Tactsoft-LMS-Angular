import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { footerNavs, frontendNavs } from 'src/app/features/configs/route.config';
import * as $ from "jquery";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.scss']
})
export class FrontendComponent implements OnInit{

  frontendNavs = frontendNavs.filter( (e) => e.component!== undefined && e.menu);
  footerNavs = footerNavs.filter( (e) => e.component!== undefined && e.menu);

  @HostListener('window:scroll', ['$event']) onWindowScroll() {

      this.stickyNav();
      this.scrollFunction();
  }

    stickyNav(){
      let element = document.querySelector('.navbar') as HTMLElement;
      if (window.pageYOffset > 50) {
        element.classList.add('sticky-nav');
      } else {
        element.classList.remove('sticky-nav');
      }
    }

    scrollFunction() {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
          document.getElementById("myBtn").style.display = "block";
      } else {
          document.getElementById("myBtn").style.display = "none";
      }
    }

    topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }



  ngOnInit(): void {


  }


}
