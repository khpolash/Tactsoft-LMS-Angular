import { Component, HostListener, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { CountUpOptions } from 'countup.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  slideData = [
     { id: 382, name: "Metal bluetooth cyan", },
     { id: 822, name: "Avon",},
     { id: 159, name: "Infrastructures", },
     { id: 424, name: "Users Cotton", },
     { id: 572, name: "Haptic Oklahoma Jewelery", },
     { id: 127, name: "Circles Integration Street", },
     { id: 109, name: "uniform Communications Tuna", },
     { id: 619, name: "North Carolina", },
     { id: 716, name: "Eyeballs Rubber", },
     { id: 382, name: "Nevada green unleash", }
  ]

  swiperCarouselConfig: SwiperOptions = {
    autoplay: { delay: 3000, disableOnInteraction: false, },
    speed: 1500,
    loop: true,
    effect: 'fade',
    grabCursor: true,
    fadeEffect: { crossFade: true },
    pagination: { el: '.swiper-pagination', clickable: false },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'},
    spaceBetween: 100,
  };

  testimonialCarouselConfig: SwiperOptions = {
    autoplay: { delay: 3000, disableOnInteraction: false, },
    speed: 1500,
    loop: true,
    effect: 'slide',
    grabCursor: true,
    fadeEffect: { crossFade: true },
    pagination: { el: '.swiper-pagination', clickable: false },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'},
    spaceBetween: 100,
  };

  // opts: CountUpOptions = {
  //   enableScrollSpy: true,
  //   duration:6,
  // };

  ngOnInit(): void {


  }

}
