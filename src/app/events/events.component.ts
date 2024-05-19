import { Component } from '@angular/core';
import { Event } from '../services/models/event'
import {FormControl} from "@angular/forms";
import {EventControllerService} from "../services/services/event-controller.service";
import {HttpClient} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  events: Array<Event>;
  eventControl = new FormControl();
  eventTypes: string[] = ['Social', 'Eco'];




  constructor(
    private eventService: EventControllerService,
    private http: HttpClient,
  ) {
    this.events = [];
    this.loadEvents();


  }

  filterEvents() {
    // Implement your logic to filter events based on selectedEventNames
  }
  handleChange() {
    console.log(); // This will log the DOM element that triggered the change event
  }

  loadEvents(){
    this.http.get<Event[]>("http://localhost:8080/api/v1/event/").subscribe(
        (response) => {
          this.events = response;
          console.log(this.events);
          console.log(response);
        },
        error => console.log(error)
    )
  }




}
