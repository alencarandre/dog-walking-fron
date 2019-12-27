import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DogWalkingService } from 'src/app/services/dog-walking-api/dog-walking.service';
import { DogWalking } from 'src/app/models/dog-walking.model';
import { TablePriceService } from 'src/app/services/dog-walking-api/table-price.service';
import { TablePrice } from 'src/app/models/table-price.model';
import { DogService } from 'src/app/services/dog-walking-api/dog.service';
import { Dog } from 'src/app/models/dog.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  scheduleForm: FormGroup;
  dogWalking: DogWalking;
  tablePrices: TablePrice[];
  dogs: Dog[];

  constructor(
    private dogWalkingService: DogWalkingService,
    private tablePriceService: TablePriceService,
    private dogService: DogService,
    private router: Router
  ) {
    this.dogWalking = new DogWalking();
    this.createForm();
  }

  createForm() {
    this.scheduleForm = new FormGroup({
      scheduled_at: new FormControl(new Date(), Validators.required),
      latitude: new FormControl(0, Validators.required),
      longitude: new FormControl(0, Validators.required),
      duration: new FormControl(30, Validators.required),
      dogs: new FormControl([], Validators.required)
    })
  }

  onFormSubmit() {
    if(! this.scheduleForm.valid) {
      return alert("The form contain invalid values. Please, check before continue.");
    }

    this.fromFormToDogWalking()

    this.dogWalkingService.create(this.dogWalking)
      .subscribe(dogWalking => {
        alert("Scheduled was created.");

        this.router.navigate(['/'])
      })

    console.log(this.dogWalking);
  }

  ngOnInit() {
    this.tablePriceService.list()
      .subscribe(tablePrices => {
        this.tablePrices = tablePrices
      })
    
    this.dogService.list()
      .subscribe(dogs => {
        this.dogs = dogs;
      })
  }

  fromFormToDogWalking() {
    this.dogWalking.scheduled_at = this.scheduleForm.controls.scheduled_at.value;
    this.dogWalking.duration = parseInt(this.scheduleForm.controls.duration.value);

    this.dogWalking.pets = [];
    this.scheduleForm.controls.dogs.value.forEach(element => {
      let dog = new Dog();
      dog.id = element;

      this.dogWalking.pets.push(dog);
    });
  }
}
