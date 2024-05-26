import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Event } from "../services/models/event";
import {HttpClient} from "@angular/common/http";
import {User} from "../services/models/user";
import {Volunteer} from "../services/models/volunteer";
import {Organization} from "../services/models/organization";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  role: string;
  username: string;

  // volunteers pages navigation
  myProfile: boolean;
  userSettings: boolean;
  volunteerEvents: boolean;

  // organization pages navigation
  organizationProfile: boolean;
  organizationEvents: boolean;
  creationEvent: boolean;

  organizationEventsList: Event[] = [];

  // admin pages navigation
  usersList: boolean;
  eventsList: boolean;
  organizationList: boolean;
  loadedUsersList: User[] = [];
  loadedEventsList: Event[] = [];
  loadedOrganizationList: Organization[] = [];

  eventForm: FormGroup;


  myOrganization: Organization = {};


  profileForm: FormGroup;
  changePasswordForm: FormGroup;
  volunteerDetails: Volunteer = {};
  cities : string[] = [];
  events: Event[] = [];

  organizationForm: FormGroup;







  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private eventFormBuilder: FormBuilder,
    private http: HttpClient,
    private formBuilder: FormBuilder,

  ) {
    this.username = userService.username;
    this.role = userService.role;
    this.loadCities();
    this.loadVolunteerData();
    this.loadOrganizationByUsername();


    // initialization of volunteer
    this.myProfile = true;
    this.userSettings = false;
    this.volunteerEvents = false;

    // initialization of organization

    this.organizationProfile = true;
    this.organizationEvents = false;
    this.creationEvent = false;

    // initialization of admin
    this.usersList = true;
    this.eventsList = false;
    this.organizationList = false;

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      aboutMe: [''],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      experienceMonth: ['', [Validators.required, Validators.min(0)]],
    });

    this.eventForm = this.eventFormBuilder.group({
      eventName: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventStartDate: ['', Validators.required],
      eventEndDate: ['', Validators.required],
      eventType: ['', Validators.required],
      city: ['', Validators.required],
      // organization: ['', Validators.required]
    });


    this.organizationForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      address: ['', Validators.required],
      phone: [''],
      email: ['', Validators.email],
      bin: [''],
      city: ['', Validators.required],
    });

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    this.loadUserEvents();



  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }


  onSubmitPassword(): void {
    if (this.changePasswordForm.valid) {
      const formData = this.changePasswordForm.value;
      console.log('Form Data:', formData);
      // Handle form submission, e.g., send data to the server
    } else {
      console.log('Form is invalid');
    }
  }




  volunteer = {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "address": "123 Main St",
    "city": "Anytown",
    "aboutMe": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "birthday": "1990-05-15",
    "gender": "Male",
    "experienceMonth": 12
  }

  organization =  {

  }

  loadCities(){
    this.http.get<string[]>("http://localhost:8080/api/v1/city/").subscribe(
      (response) => {
        this.cities = response;
      }
    )
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value as Volunteer;
      let userData  = {};

      formData.volunteerId = this.volunteerDetails.volunteerId;
      formData.user = this.volunteerDetails.user;
      console.log('that is going to be ' + formData.volunteerId)

      console.log('that is going to be ' + formData.user)

      this.http.put("http://localhost:8080/api/v1/volunteer", formData).subscribe(
        (response) => {
          console.log(response);
        }
      )

      this.profileForm.patchValue(userData);

      console.log('Form Data:', formData);
      // Handle form submission, e.g., send data to the server
    } else {
      console.log('Form is invalid');
    }
  }

  loadVolunteerData () {
    this.http.get(`http://localhost:8080/api/v1/volunteer/username?username=${this.username}`).subscribe(
      (response) => {
        this.volunteerDetails = response;
      }
    )
  }

  loadUserData(): void {
    let userData  = {};

      this.http.get<User>(`http://localhost:8080/api/v1/volunteer/username?username=${this.username}`).subscribe(
      (response) => {
        console.log(response);
        userData = response;
        // this.volunteerDetails = response;
        this.profileForm.patchValue(userData);

      }
    )

  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserEvents(){
    this.http.get<Event[]>("http://localhost:8080/api/v1/event-registration/event/username/" + this.username).subscribe(
      response => {
        console.log(response);
        this.events = response;
      }
    )
  }


  changeVolunteerLayout(layout: string){
    if (layout === 'settings') {
      this.volunteerEvents = false;
      this.userSettings = true;
      this.myProfile = false;
    }
    if (layout === 'volunteerEvents'){
      this.volunteerEvents = true;
      this.userSettings = false;
      this.myProfile = false;
    }
    if (layout === 'profile'){
      this.volunteerEvents = false;
      this.userSettings = false;
      this.myProfile = true;

    }
  }

  changeOrganizationLayout(layout: string){
    if (layout === 'profile') {
      this.organizationProfile = true;
      this.organizationEvents = false;
      this.creationEvent = false;

    }
    if (layout === 'events'){
      this.organizationProfile = false;
      this.organizationEvents = true;
      this.creationEvent = false;

    }
    if (layout === 'creationEvent') {
      this.creationEvent = true;
      this.organizationEvents = false;
      this.organizationProfile = false;
    }
  }

  loadOrganizationByUsername(){
    this.http.get<Organization>("http://localhost:8080/api/v1/organization/username/" + this.username).subscribe(
      (response) => {
        this.myOrganization = response;
        this.loadOrganizationEventList(response.organizationId as number);
        this.organizationForm.patchValue(this.myOrganization);
      }
    )
  }

  loadOrganizationEventList(organizationId : number){
    this.http.get<Event[]>(`http://localhost:8080/api/v1/event/organization/${organizationId}`).subscribe(
      (response) => {
        console.log(response);
        this.organizationEventsList = response;
      }
    )
  }

  saveOrganizationDetails(){
    if (this.organizationForm.valid) {
      const formData = this.organizationForm.value as Organization;
      formData.organizationId = this.myOrganization.organizationId;
      formData.owner = this.myOrganization.owner;
      this.http.put('http://localhost:8080/api/v1/organization', formData).subscribe(
        (response) => {
          this.organizationForm.patchValue(response);
        }
      )

    }
  }


  unapplyToEvent(eventId: number) {

    console.log(this.volunteer);

    const url = `http://localhost:8080/api/v1/event-registration/unregister?eventId=${eventId}&volunteerId=${this.volunteerDetails.volunteerId}`;
    this.http.delete(url).subscribe(
      (response) => {
        console.log(response);
        this.loadUserEvents();
      }
    );
  }

  // loadOrganizationEvents(){
  //   this.http.get<Event[]>("http://localhost:8080/api/v1/event-registration/event/username/" + this.username).subscribe(
  //     response => {
  //       console.log(response);
  //       this.events = response;
  //     }
  //   )
  // }


  createEventByOrganization() {
    console.log('enter')
    if (this.eventForm.valid){
      console.log('validated')
      const formData = {
        eventName: this.eventForm.get('eventName')?.value,
        eventDescription: this.eventForm.get('eventDescription')?.value,
        eventLocation: this.eventForm.get('eventLocation')?.value,
        eventStartDate: new Date(this.eventForm.get('eventStartDate')?.value).getTime(),
        eventEndDate: new Date(this.eventForm.get('eventEndDate')?.value).getTime(),
        eventType: this.eventForm.get('eventType')?.value,
        city: this.eventForm.get('city')?.value,
        organization: this.myOrganization,
      };


      // const formData = this.eventForm.value as Event;
      // console.log(formData);
      // formData.eventStartDate = new Date(formData.eventStartDate).getTime();
      // console.log(1)
      // formData.eventEndDate = new Date(formData.eventEndDate).getTime();
      // console.log(2)
      // formData.organization = this.myOrganization;
      // console.log(3)
      this.http.post("http://localhost:8080/api/v1/event", formData).subscribe(
        (response) => {
          console.log(response);
          this.loadOrganizationEventList(this.myOrganization.organizationId as number)

        }
      )
    }
  }

  deactivateEvent(eventId: number) {
    this.http.delete(`http://localhost:8080/api/v1/event/event/${eventId}`).subscribe(
      (response) => {
        console.log(response);
        this.loadOrganizationEventList(this.myOrganization.organizationId as number)
      }
    )
  }

  activateEvent(eventId: number) {
    this.http.get(`http://localhost:8080/api/v1/event/event/${eventId}`).subscribe(
      (response) => {
        console.log(response);
        this.loadOrganizationEventList(this.myOrganization.organizationId as number)
      }
    )
  }

}
