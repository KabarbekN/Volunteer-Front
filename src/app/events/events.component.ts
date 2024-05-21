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
  staticEvents: Array<Event>;
  eventControl = new FormControl();
  eventTypes: string[] = [];
  previousEventTypes: string[] = [];
  cities: string[] = ['All'];
  selectedCity : string = 'All';




  constructor(
    private eventService: EventControllerService,
    private http: HttpClient,
  ) {
    this.events = [];
    this.staticEvents = [];
    this.loadEvents();
  }

  filterEvents() {
    // Implement your logic to filter events based on selectedEventNames
  }
  handleChange(eventType: string) {

    this.events = this.staticEvents;
    if (this.previousEventTypes.includes(eventType)){
      for( let i = 0; i < this.events.length; i++){
        if (this.previousEventTypes[i] === eventType){
          this.previousEventTypes.splice(i, 1);
        }
      }
    } else {
      if (eventType !== 'trigger'){
        this.previousEventTypes.push(eventType);
      }
    }


    let temp : Event[] = [];

    this.events.forEach(event => {
      if (this.previousEventTypes.includes(event.eventType as string) && (event.city === this.selectedCity || this.selectedCity === 'All')) {
          temp.push(event);

      }
    });
    this.events = temp;

    if (this.previousEventTypes.length === 0){
      this.events = this.staticEvents;
    }
  }

  loadEvents(){
    this.http.get<Event[]>("http://localhost:8080/api/v1/event/").subscribe(
        (response) => {
          this.events = response;
          this.staticEvents = response;
          response.forEach(event => {
            if (!this.eventTypes.includes(event.eventType as string)) {
              this.eventTypes.push(event.eventType as string);
            }
            if (!this.cities.includes(event.city as string)){
              this.cities.push(event.city as string);
            }
          });

        },
        // error => console.log(error)
    );


  }


}
