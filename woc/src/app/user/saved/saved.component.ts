import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

import {UsersService} from '../../services/users/users.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-saved',
    templateUrl: '../../events/events.component.html',
    styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {
    events = [];
    page;
    prevPage;
    nextPage;
    disPrevPage = false;
    disNextPage = false;
    link = "saved";

    constructor(private activatedRoute: ActivatedRoute, private user: UsersService, private router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['page']) {
                this.page = +params['page'];
            } else {
                this.page = 1;
            }

            this.prevPage = this.page - 1;
            this.nextPage = this.page + 1;

            if (this.prevPage < 1) {
                this.disPrevPage = true;
            }
        });
        this.getSavedEvents();
    }

    getSavedEvents() {
        this.user.getSavedEvents().pipe(map(data => data)).subscribe((data) => {
            this.events = data['Events'];
            console.log(this.events);

            for (var i = 0; i < this.events.length; i++) {
                this.events[i].imageurl = environment.IMAGE_URL + this.events[i].imageurl;
            }
        });
    }

    eventClick(event, eid) {
        var target = event.target || event.srcElement || event.currentTarget;
        if (target.attributes.class) {
            if (!(target.attributes.class.nodeValue == "saved_event_bookmark_icon btn")) {
                this.router.navigate(['/event/' + eid]);
            }
        } else {
            this.router.navigate(['/event/' + eid]);
        }
    }

    saveEvent(event, eid) {
        this.user.saveEvent(eid).subscribe(data => {
            this.getSavedEvents();
        });
    }


}
