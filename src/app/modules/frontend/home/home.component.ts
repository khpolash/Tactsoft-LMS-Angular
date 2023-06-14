import { Component, OnInit } from '@angular/core';
import { AllEventService } from 'src/app/features/services/all-event.service';
import { CarouselService } from 'src/app/features/services/carousel.service';
import { environment } from 'src/environments/environment';

const carouselUrl = `${environment.baseUrl}/images/carousels/`;
const eventUrl = `${environment.baseUrl}/images/allEvents/`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  constructor(
    private carouselService: CarouselService,
    private allEventService: AllEventService,
    ){}


  optionimages=[];
  eventImages = [];

  carouselConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:3000,
    arrows:true,
    draggable: true,
    fade: true,
    speed: 1500,
    infinite: true,
    cssEase: 'ease-in-out',
    touchThreshold: 100,
    pauseOnHover:false,
    prevArrow: false,
    nextArrow: false
  };

  eventConfig = {
    slidesToShow:4,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:3000,
    arrows:true,
    draggable: true,
    dots:false,
    speed: 500,
    infinite: true,
    touchThreshold: 100,
    pauseOnHover:false,
    responsive: [
      {
        // for desktop width 992px
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        // << for tablet
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        // << here's your mobile
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3
        }
      }]
    // prevArrow: false,
    // nextArrow: false
  };




  // opts: CountUpOptions = {
  //   enableScrollSpy: true,
  //   duration:6,
  // };

  ngOnInit(): void {
    this.carouselService.getAllAsync().subscribe(result => {
      let allImage = result['data'].reduce((temp: { name: any; picture: string; isActive: any; }[], item: { name: any; picture: string; isActive: any; })=> {
        temp.push({name:item.name, picture:carouselUrl+item.picture, isActive:item.isActive})
        return temp;
      },[])
      allImage.map((data: { isActive: boolean; })=>data.isActive==true?this.optionimages.push(data):null)
    });

    this.allEventService.getAllAsync().subscribe(result => {
      let allEventImage = result['data'].reduce((temp: { name: any; picture: string; isActive: any; description: any; }[], item: { name: any; picture: string; isActive: any; description: any; })=> {
        temp.push({name:item.name, picture:eventUrl+item.picture, isActive:item.isActive, description:item.description})
        return temp;
      },[])
      allEventImage.map((data: { isActive: boolean; })=>data.isActive==true?this.eventImages.push(data):null)
    });

  }


}
