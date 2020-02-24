import {Injectable} from '@angular/core';

import {RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    private base_url = environment.API_URL;

    constructor(private http: HttpClient, private auth: AuthService) {
    }

    getAllEvents() {
        //Change this to a more   general place
        return this.http.get(this.base_url + 'events');
    }

    getEventsPaginated(num) {
        var request = this.http.get(this.base_url + 'events?page=' + num);
        return request;

    }

    getEvent(eid) {
        return this.http.get(this.base_url + 'event/' + eid);
    }


    getSavedEvents() {
        return this.http.get(this.base_url + 'events/save/');
    }


    getCategories() {
        return this.http.get(this.base_url + 'categories');
    }

    getCategoryEvents(num, category) {
        var request = this.http.get(this.base_url + 'events?page=' + num + '&category=' + category);

        return request;
    }

    createEvent(title, place, briefDescription, fullDescription, startTime, endTime, category, image, postedUid, contactemail, contactphone) {
        let file: File = image;

        const options = {
            reportProgress: true
        } as any;
        const formData = new FormData();

        formData.append('imageurl', file, file.name)

        var data = {
            'title': title,
            'briefdescription': briefDescription,
            'fulldescription': fullDescription,
            'starttimestamp': startTime,
            'endtimestamp': endTime,
            'place': place,
            'categoryname': category,
            'contactemail': contactemail,
            'contactphone': contactphone,
            'postedUid': postedUid,
        }

        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        return this.http.post(this.base_url + 'events', formData, options)
    }
}
