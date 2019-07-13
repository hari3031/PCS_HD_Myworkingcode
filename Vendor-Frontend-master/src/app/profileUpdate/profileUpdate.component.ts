import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
 import {AppService} from './../app.service';
 import { Router } from '@angular/router';
 import{AppComponent} from './../app.component';
 import {AddUserService} from './../login/login.service';
 import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'profileUpdate',
  templateUrl: 'profileUpdate.component.html'
})
export class ProfileUpdateComponent{
userData:{};
patientprofile:any;
firstname:any;
lastname:any;
email:any;
phonenumber:any;
role:any;
universityname:any;
cityname:any;
dob:any;
major:any;
userId:any;
constructor(private appService: AppService,private flashMessage:FlashMessagesService,
        private router: Router, private appComponent: AppComponent,private userService:AddUserService){

this.patientprofile = JSON.parse(localStorage.getItem('patientDetails'))
this.firstname = this.patientprofile.firstname;
this.lastname = this.patientprofile.lastname;
this.email = this.patientprofile.email;
this.phonenumber = this.patientprofile.phonenumber;
this.role = this.patientprofile.role;
this.universityname = this.patientprofile.universityname;
this.cityname = this.patientprofile.cityname;
this.dob = this.patientprofile.dob;
this.major = this.patientprofile.major;
this.userId = this.patientprofile.userId;

console.log(this.patientprofile);
console.log(this.userId);

}

onSubmit(k: NgForm){
    console.log('Email:', k.value.email);
     event.preventDefault();
    var addUser=
    {
      username: k.value.username,
      password:k.value.password,
      firstname:k.value.firstname,
      lastname:k.value.lastname,
      email:k.value.email,
      phonenumber:k.value.phonenumber,
      role:k.value.role,
      universityname:k.value.universityname,
      cityname:k.value.cityname,
      dob:k.value.dob,
      major:k.value.major,
      upload:k.value.upload

    }
    this.userService.setData("username",addUser.username);
    this.userService.setData("password",addUser.password);
    this.userService.setData("firstname",addUser.firstname);
    this.userService.setData("lastname",addUser.lastname);
    this.userService.setData("email",addUser.email);
    this.userService.setData("phonenumber",addUser.phonenumber);
    this.userService.setData("role",addUser.role);
    this.userService.setData("upload",addUser.upload);
    this.userService.setData("universityname",addUser.universityname);
    this.userService.setData("cityname",addUser.cityname);
    this.userService.setData("dob",addUser.dob);
    this.userService.setData("major",addUser.major);
    this.userService.setData("username",this.patientprofile.username);
    this.userService.setData("password",this.patientprofile.password);
    this.userService.setData("userId",this.patientprofile.userId);
    console.log("userId")

    this.userData=this.userService.getData();
    this.appService.updateUser(this.userData)
                .subscribe(result => {
                  console.log(result);
                  this.flashMessage.show('Changes Saved Successfully',{cssClass:'alert-success',timeout:5000});
                  this.router.navigate(['/profile'])
              })
}


}