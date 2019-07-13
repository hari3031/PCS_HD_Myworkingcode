import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {
  employer:any;
  firstname:any;
  lastname:any;
  email:any;
  phonennumber:any;

  constructor()
  {
    console.log("hello");
  this.employer = JSON.parse(localStorage.getItem('employerdetails'));
  this.email=this.employer.email;
  this.phonennumber=this.employer.phoneNumber;
  this.firstname=this.employer.firstName;
  this.lastname=this.employer.lastName;
  console.log(this.firstname);
}

  ngOnInit() {
  }

}
