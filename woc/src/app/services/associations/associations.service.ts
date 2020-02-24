import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AssociationsService {
    private base_url = environment.API_URL;

    constructor(private http: HttpClient) {
    }

    getAssocEvents() {
        return this.http.get(this.base_url + 'users/events');
    }

    getEditEvent(eid) {
        return this.http.get(this.base_url + 'event/update/' + eid);
    }

    updateEvent(eid, title, place, briefDescription, fullDescription, startTime, endTime, category, image, postedUid, contactemail, contactphone) {
        let file: File = image;

        const options = {
            reportProgress: true
        } as any;
        const formData = new FormData();

        //formData.append('imageurl', file, file.name)

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

        return this.http.put(this.base_url + 'event/update/'+eid, formData, options)
    }
}
