import { BrowserModule} from "@angular/platform-browser";
import { NgModule} from "@angular/core";
import { AgGridModule} from "ag-grid-angular/main";
import { HttpModule} from '@angular/http';
import { AppComponent} from "./app.component";
import { MyGridApplicationComponent} from "./my-grid-application/my-grid-application.component";
import { RedComponentComponent} from "./red-component/red-component.component";
import { AlertModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CollapseModule } from 'ngx-bootstrap';
import { AppRoutingModule} from './app.routing';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FormsModule,ReactiveFormsModule} from "@angular/forms";
import { VendorUpdateComponent} from "./vendorUpdate/vendorUpdate.component";
import { AddVendorComponent} from "./vendorAdd/vendorAdd.component";
import { VendorDeleteComponent} from "./vendorDelete/vendorDelete.component";
import { LoginComponent} from "./login/login.component";
import { ProfileUpdateComponent} from "./profileUpdate/profileUpdate.component";
import { AngularFireModule } from 'angularfire2';
import { AuthGuard } from './auth.service';
import { MembersComponent } from './members/members.component';
import { VendorComment} from './vendorComment/vendorComment.component';
import { EmployerGridComponent } from './employer-grid/employer-grid.component';
import { FlashMessagesModule} from 'angular2-flash-messages';
import { EmployerComponent } from './employer/employer.component';

export const firebaseConfig = {
    apiKey: "AIzaSyB2BkQpUOpM35tItcWMd_FfKmldR9jbBeY",
    authDomain: "egiants-60a0e.firebaseapp.com",
    databaseURL: "https://egiants-60a0e.firebaseio.com",
    projectId: "egiants-60a0e",
    storageBucket: "",
    messagingSenderId: "521585312793"
};

@NgModule({
    declarations: [
        AppComponent,
        MyGridApplicationComponent,
        RedComponentComponent,
        VendorUpdateComponent,
        AddVendorComponent,
        VendorDeleteComponent,
        LoginComponent,
        ProfileUpdateComponent,
        MembersComponent,
        VendorComment,
        EmployerGridComponent,
        EmployerComponent  
    ],
    imports: [
        HttpModule,
        BrowserModule,      
        AgGridModule.withComponents(
            [RedComponentComponent]
        ),
        AlertModule.forRoot(),
        CollapseModule,
        AppRoutingModule,
        // //ModalModule,
        // BootstrapModalModule,
        Ng2Bs3ModalModule,
        ReactiveFormsModule,
        FormsModule,
        BsDropdownModule.forRoot(),
        FlashMessagesModule,
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    providers: [AuthGuard],
    exports: [BsDropdownModule],
    bootstrap: [AppComponent]
})
export class AppModule {
}
