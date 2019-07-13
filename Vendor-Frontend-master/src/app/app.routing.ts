import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyGridApplicationComponent} from './my-grid-application/my-grid-application.component'
import { VendorUpdateComponent} from './vendorUpdate/vendorUpdate.component';
import { LoginComponent} from './login/login.component';
import { ProfileUpdateComponent} from './profileUpdate/profileUpdate.component'
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { VendorComment } from './vendorComment/vendorComment.component';
import { EmployerGridComponent } from './employer-grid/employer-grid.component';
import { EmployerComponent } from './employer/employer.component';

const routes: Routes = [
     {path:'grid', component:MyGridApplicationComponent},
     {path:'update',component:VendorUpdateComponent},
     {path:'login', component:LoginComponent},
     {path: 'profile' , component:ProfileUpdateComponent},
     {path: 'members', component: MembersComponent, canActivate: [AuthGuard]},
     {path: 'comment/:id/:name' , component:VendorComment},
     {path:'employergrid',component:EmployerGridComponent},
     {path:'employer',component:EmployerComponent}

    // { path: 'logout' , component: PatientComponent},
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule{

}