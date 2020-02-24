import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {AuthService} from '../auth.service';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UsersService {
    base_url = environment.API_URL;
    events = null;

    private head = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}

    constructor(private auth: AuthService, private http: HttpClient) {
    }

    getSavedEvents() {
        return this.http.get(this.base_url + 'mobile/savedevents/');
    }

    saveEvent(eid) {
        console.log("THIS? " + eid);
        //const body = new HttpParams().set('uid', this.uid);
        //console.log(this.uid);
        return this.http.post(this.base_url + 'mobile/save/' + eid, '', this.head);
    }

}
