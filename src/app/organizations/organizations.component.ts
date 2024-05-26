import { Component } from '@angular/core';
import {Organization} from "../services/models/organization";
import {Event} from "../services/models/event";
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.css'
})
export class OrganizationsComponent{

  events: Array<Event> = [];
  staticEvents: Array<Event> = [];
  eventControl = new FormControl();
  eventTypes: string[] = [];
  previousEventTypes: string[] = [];
  cities: string[] = ['All'];
  selectedCity : string = 'All';
  staticOrganizations: Organization[] = [];
  organizations: Organization[] = [];

  handleChange(eventType: string) {
    this.organizations = this.staticOrganizations;
    let temp : Organization[] = [];
    if (eventType === 'trigger') {
      this.organizations.forEach(organization => {
        if (organization.city === this.selectedCity){
          temp.push(organization);
        }
      });
      this.organizations = temp;
    }
  }

  constructor(
    private http: HttpClient
  ) {
    this.loadOrganizations();
    this.loadCities();
  }

  loadOrganizations(): void {
    this.http.get<Organization[]>("http://localhost:8080/api/v1/organization/").subscribe(
      (response) => {
        this.organizations = response;
        this.staticOrganizations = response;
      }
    );
  }

  loadCities(){
    this.http.get<string[]>("http://localhost:8080/api/v1/city/").subscribe(
      (response) => {
        // this.cities = response;
        response.forEach(cities => {
          this.cities.push(cities);
        })
      }
    )
  }
}
