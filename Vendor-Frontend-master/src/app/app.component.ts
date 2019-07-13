import { Component } from '@angular/core';
import{AppService} from './app.service';
import{VendorUpdateComponent} from './vendorUpdate/vendorUpdate.component';
import{VendorService} from './vendorUpdate/vendor.service';
import{AddVendorService} from './vendorAdd/vendorAdd.service';
import{AddUserService} from './login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AppService,VendorUpdateComponent,VendorService,AddVendorService,AddUserService]
})

export class AppComponent {
  user = {};
  signUpVisibilityFlag:boolean=true;
  patientInfo:any;
  userId:any;
  employer_id:any;
  firstname:any;
  lastname:any;
  email:any;
  phonenumber:any;
  employer:any;
  constructor(private appService: AppService,private router: Router){
    localStorage.clear();
  }

signUpdissapear(){
    console.log("login before :"+this.signUpVisibilityFlag)
     this.signUpVisibilityFlag = JSON.parse(localStorage.getItem('signUpFlag'));
     this.patientInfo = JSON.parse(localStorage.getItem('patientDetails'))
    console.log("login "+this.signUpVisibilityFlag);
    console.log(localStorage.getItem('patientDetails'));
}
logout(){
  localStorage.clear();
  this.signUpVisibilityFlag=true;
  this.patientInfo='';
}
onEmployerClick(){
  this.userId=this.patientInfo.userId;
  this.employer_id=this.patientInfo.employer_id;
  console.log("hello");
  console.log(this.userId);
  console.log(this.employer_id);
  this.appService.getEmployer(this.employer_id)
                .subscribe(result => {
                    localStorage.setItem('employerdetails',JSON.stringify(result));

                    this.employer=JSON.parse(localStorage.getItem('employerdetails'));
                    console.log(result);
                    this.email=this.employer.email;
                    this.phonenumber=this.employer.phoneNumber;
                    this.firstname=this.employer.firstName;
                    this.lastname=this.employer.lastName;
                    console.log(this.email);
                    console.log(this.firstname);
                    console.log(this.lastname);
                    console.log(this.phonenumber);
                    this.router.navigate(['/employer'])
                    })
                  }
}
