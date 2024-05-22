import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Event } from "../services/models/event";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  role: string;
  username: string;
  myProfile: boolean;
  userSettings: boolean;
  volunteerEvents: boolean;
  profileForm: FormGroup;
  changePasswordForm: FormGroup;
  events: Event[] = [
    {
      city : 'New York',
      eventDescription: 'Community cleanup event.',
      eventEndDate: new Date('2024-06-01').getTime(),
      eventId: 1,
      eventLocation: 'Central Park',
      eventName: 'Clean the Park',
      eventStartDate: new Date('2024-05-25').getTime(),
      eventStatus: 'OPEN',
      eventType: 'ECO'
    },
    {
      city: 'Los Angeles',
      eventDescription: 'Food drive for the homeless.',
      eventEndDate: new Date('2024-06-10').getTime(),
      eventId: 2,
      eventLocation: 'Downtown LA',
      eventName: 'Food Drive',
      eventStartDate: new Date('2024-06-05').getTime(),
      eventStatus: 'OPEN',
      eventType: 'SOCIAL'
    },
    {
      city: 'San Francisco',
      eventDescription: 'Tree planting event.',
      eventEndDate: new Date('2024-06-15').getTime(),
      eventId: 3,
      eventLocation: 'Golden Gate Park',
      eventName: 'Plant a Tree',
      eventStartDate: new Date('2024-06-12').getTime(),
      eventStatus: 'CLOSED',
      eventType: 'ECO'
    }
  ];





  constructor(
    private userService: UserService,
    private fb: FormBuilder,

  ) {
    this.username = userService.username;
    this.role = userService.role;

    this.myProfile = true;
    this.userSettings = false;
    this.volunteerEvents = false;

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

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });




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

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      console.log('Form Data:', formData);
      // Handle form submission, e.g., send data to the server
    } else {
      console.log('Form is invalid');
    }
  }

  loadUserData(): void {
    // Simulating fetching data from a service
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      city: 'Anytown',
      aboutMe: 'I love volunteering.',
      birthday: '1990-01-01',
      gender: 'Male',
      experienceMonth: 12
    };
    this.profileForm.patchValue(userData);
  }

  ngOnInit(): void {
    this.loadUserData();
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


}
