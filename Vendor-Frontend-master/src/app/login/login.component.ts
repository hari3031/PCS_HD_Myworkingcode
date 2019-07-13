import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
// import {TaskService} from './services/task.service';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {AppService} from './../app.service';
import { Router } from '@angular/router';
import {AppComponent} from './../app.component';
import {AddUserService} from './login.service';
@Component({

  selector: 'login',
  templateUrl: 'login.component.html'
  // providers:[TaskService]
})

export class LoginComponent {
  userData:{};
  
  data:{
    username:String,
    password:String
  };

  uflag:boolean;
  eflag:boolean;
  error: any;
  username:String
  password:String
  patientDetails:any
  temp: any

  constructor(public af: AngularFire, private appService: AppService, private router: Router, private appComponent: AppComponent,private userService:AddUserService){
    this.af.auth.subscribe(auth => { 
      if(auth) {
    //    this.router.navigateByUrl('/members');
      }
    });
  }

  onSubmit(g: NgForm){
    console.log('Username:', g.value.username);

    this.appService.getApp(g.value.username,g.value.password)
                    .subscribe(patients => {
                         localStorage.setItem('patientDetails',JSON.stringify(patients));
                         localStorage.setItem('signUpFlag',"false");
                        this.appComponent.signUpdissapear();
                        this.router.navigate([''])
                    },
                 //   error =>{alert("Please enter valid details")}
                  )
    }

    loginGoogle() {
      this.af.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup,
      }).then(
          (success) => {
         //   console.log("Email: "+success.auth.email);
            this.appService.getUserByEmail(success.auth.email).subscribe(patients => {           
            //  console.log("patients -->"+ JSON.stringify(patients));
              this.temp =  JSON.stringify(patients);
              console.log("In temp ========="+this.temp);
                console.log("userName ------>"+ patients.username);
              localStorage.setItem('patientDetails',JSON.stringify(patients));
              localStorage.setItem('signUpFlag',"false");
             this.appComponent.signUpdissapear();
             this.router.navigate([''])
            
         }, err => {console.log("Could not find data, Please contact Administrator");
         this.error = "Could not find data, Please contact Administrator";
        }
       )

        }).catch(
          (err) => {
          this.error = "*************************************";
          console.log(this.error);
        })
    }

  onPost(f: NgForm){
     console.log('Uname:', f.value.username);
      event.preventDefault();
     var addUser=
     {
       //vendor_id :this.vendorDet[0].vendor_id,
       username: f.value.username,
       password:f.value.password,
       firstname:f.value.firstname,
       lastname:f.value.lastname,
       email:f.value.email,
       phonenumber:f.value.phonenumber,
       role:f.value.role,
       universityname:f.value.universityname,
       cityname:f.value.cityname,
       dob:f.value.dob,
       major:f.value.major,
       upload:f.value.upload
     }
     //this.vendorService.setData("vendor_id",updateVendor.vendor_id);
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
      this.userData=this.userService.getData();
      this.userService.postApp(this.userData)
                     .subscribe(patients => {                 
                          localStorage.setItem('patientDetails',JSON.stringify(patients));
                          localStorage.setItem('signUpFlag',"false");
                         this.appComponent.signUpdissapear();
                         this.router.navigate([''])
                    })
 }
 val=''
 focusOutFunction(event:any)
 {
        console.log("test");
        this.val=event.target.value;
        console.log("focus :"+this.val);
        this.appService.validUser(this.val).subscribe(dflag=>{
                console.log(dflag);
               localStorage.setItem("flag",JSON.stringify(dflag));
               this.uflag=JSON.parse(localStorage.getItem('flag'));
               if(this.uflag){
                   console.log("Focus : User exists already")
               }             
})        
}
emailVal='';
 EmailfocusOutFunction(event:any){
     this.emailVal= event.target.value;
     console.log("emailfocus :"+this.emailVal);
      this.appService.validEmail(this.emailVal).subscribe(dflag=>{
                console.log(dflag);
               localStorage.setItem("Eflag",JSON.stringify(dflag));
               this.eflag=JSON.parse(localStorage.getItem('Eflag'));
               if(this.eflag){
                   console.log("Focus : email exists already")
               }
      })
 }
 
}