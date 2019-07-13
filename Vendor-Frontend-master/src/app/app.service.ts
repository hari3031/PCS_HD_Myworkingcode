import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class AppService{
    private user = {};
    private userId:any;

    constructor(private http: Http){
        console.log('app service initialized');
    }

    getAll(){
        return this.http.get('http://localhost:9090/vendor/getAll')
        .map(res => res.json());
            }

    getbyId(vendor_id){
        return this.http.get('http://localhost:9090/vendor/getVendor?vendor_id='+vendor_id)
        .map(res => res.json());
    }
    getEmployer(employer_id){
        console.log("request works!");
        return this.http.get('http://localhost:9090/user/getEmployer?employer_id='+employer_id)
        .map(res => res.json());
    }
    deleteById(vendor_id){
        return this.http.get('http://localhost:9090/vendor/deleteVendor?vendor_id='+vendor_id)
        .map(res => res|| {result :'record deleted successfully'});
    }
    updateUser(user){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(user);
        return this.http.post('http://localhost:9090/user/update',user,{headers : headers})
                   .map(res => res|| {result :'record added successfully'})
    }
    getApp(username,password){
        return this.http.get('http://localhost:9090/user/login?username='+username+'&password='+password)
        .map(res => res.json());
            }
    validUser(username){
                return this.http.get('http://localhost:9090/user/validUser?username='+username)
                .map(res => res.json());
                   }
       
    validEmail(email){
               return this.http.get('http://localhost:9090/user/validEmail?email='+email)
                .map(res => res.json());
                   }
    getUserByEmail(email){
        return this.http.get('http://localhost:9090/user/getUser?email='+email)
            .map(res => res.json());
        }
    getComments(id:number)
        {
        return this.http.get('http://localhost:9090/vendor/vendorcomments?vendor_id='+id)
            .map(res => res.json());
        }
}