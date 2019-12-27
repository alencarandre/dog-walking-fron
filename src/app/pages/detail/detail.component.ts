import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DogWalkingService } from 'src/app/services/dog-walking-api/dog-walking.service';
import { DogWalking } from 'src/app/models/dog-walking.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private dogWalking : DogWalking;

  constructor(
    private dogWalkingService: DogWalkingService, 
    private route: ActivatedRoute
  ) { }

  startWalking() {
    this.dogWalkingService
      .startWalking(this.dogWalking.id)
      .subscribe(dogWalking => {
        console.log(dogWalking);
        this.dogWalking = dogWalking;
      })
  }

  finishWalking() {
    this.dogWalkingService
      .finishWalking(this.dogWalking.id)
      .subscribe(dogWalking => {
        console.log(dogWalking);
        this.dogWalking = dogWalking;
      })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dogWalkingService.get(params['id'])
        .subscribe(dogWalking => {
          console.log(dogWalking);
          this.dogWalking = dogWalking;
        })
    });
  }
}
