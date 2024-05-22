import { Component } from '@angular/core';
import {Organization} from "../services/models/organization";
import {Event} from "../services/models/event";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.css'
})
export class OrganizationsComponent {

  events: Array<Event> = [];
  staticEvents: Array<Event> = [];
  eventControl = new FormControl();
  eventTypes: string[] = [];
  previousEventTypes: string[] = [];
  cities: string[] = ['All'];
  selectedCity : string = 'All';
  organizations: Organization[] = [
    {
      name: 'Organization Name 1',
      address: 'Address 1',
      phone: 'Phone Number 1',
      email: 'email@example.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      owner: { username: 'Owner Name 1' }
    },
    {
      name: 'Organization Name 2',
      address: 'Address 2',
      phone: 'Phone Number 2',
      email: 'email@example.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      owner: { username: 'Owner Name 2' }
    },
    {
      name: 'Organization Name 2',
      address: 'Address 2',
      phone: 'Phone Number 2',
      email: 'email@example.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      owner: { username: 'Owner Name 2' }
    }
    // Add more organizations as needed
  ];

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

}
