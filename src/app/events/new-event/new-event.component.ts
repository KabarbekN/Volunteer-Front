import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { Event} from "../../services/models/event";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrl: './new-event.component.css'
})
export class NewEventComponent implements OnInit{
  eventForm: FormGroup;
  cities : string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
              ) {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventStartDate: ['', Validators.required],
      eventEndDate: ['', Validators.required],
      eventType: ['', Validators.required],
      city: ['', Validators.required],
      // organization: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadCities();
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventStartDate: ['', Validators.required],
      eventEndDate: ['', Validators.required],
      eventType: ['', Validators.required],
      city: ['', Validators.required],
      // organization: [{}, Validators.required]
    });
  }

  onSubmit(): void {
    console.log('submit works')
    if (this.eventForm.valid) {

      const formData = this.eventForm.value as Event;
      formData.eventStartDate = new Date(formData.eventStartDate).getTime();
      formData.eventEndDate = new Date(formData.eventEndDate).getTime();
      formData.organization = {};
      // console.log(formData.organization = {});
      this.http.post("http://localhost:8080/api/v1/event/guest", formData).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['events'])
        }
      )
      // Call your service method to create the event using formData
    } else {
      // Handle form validation errors
    }
  }

  loadCities(){
    this.http.get<string[]>("http://localhost:8080/api/v1/city/").subscribe(
      (response) => {
        this.cities = response;
      }
    )
  }


}
