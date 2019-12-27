import { Component, OnInit } from '@angular/core';
import { DogWalking } from 'src/app/models/dog-walking.model';
import { DogWalkingService } from 'src/app/services/dog-walking-api/dog-walking.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  dataSource : DogWalking[];
  upcoming: boolean = false;
  tableColumns: string[] = [ 
    'status', 
    'duration', 
    'price', 
    'scheduled_at', 
    'started_at', 
    'finished_at',
    'pets',
    'actions'
  ];

  constructor(
    private dogWalkingService: DogWalkingService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.upcoming = params['upcoming'] == 'true';

      this.dogWalkingService.list({ upcoming: this.upcoming })
        .subscribe(dogWalking => {
          this.dataSource = dogWalking;
        })
    });
  }
}
