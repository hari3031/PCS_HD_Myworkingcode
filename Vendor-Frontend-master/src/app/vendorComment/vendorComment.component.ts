import {Component,OnInit} from "@angular/core"
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import{AppService} from '../app.service';
import{VendorCommentPojo} from '../vendorCommentPojo/vendorCommentPojo.component'
@Component({
    selector: 'vendor-comment',
    templateUrl: 'vendorComment.component.html',
    styleUrls:['vendorComment.css']
})

export class VendorComment implements OnInit{
    
    constructor(private appService:AppService, private router: Router, private route: ActivatedRoute){}
    comments:VendorCommentPojo[];
    sub: Subscription;
    vendor_name:string;

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            let id = + params['id'];//(+) converts string id to a number
            this.vendor_name = params['name'];
            console.log("ngOnInit() : " + id);
            console.log("ngOnInit() : " +name);
            this.appService.getComments(id).subscribe(data=>{this.comments=data});
              });
    }

}