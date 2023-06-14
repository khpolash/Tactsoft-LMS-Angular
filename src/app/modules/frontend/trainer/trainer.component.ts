import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/features/services/trainer.service';
import { environment } from 'src/environments/environment';

const imageUrl = `${environment.baseUrl}/images/trainers/`;

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit {

  trainerList:any;

  constructor(
    private trainerService:TrainerService
  ){}
  ngOnInit(): void {
    this.trainerService.getAllAsync().subscribe(res=>{
      this.trainerList = res['data'].reduce((temp, item)=> {
        temp.push({name:item.name,
          expertise:item.expertise,
          phone:item.phone,
          email:item.email,
          about:item.about,
          experience:item.experience,
          picture:imageUrl+item.picture,
          facebookLink:item.facebookLink,
          twitterLink:item.twitterLink,
          linkedinLink:item.linkedinLink,
        })
        return temp;
      },[])
      console.log(this.trainerList);

    });
  }

}
