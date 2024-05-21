import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

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


}
