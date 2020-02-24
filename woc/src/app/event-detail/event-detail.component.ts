import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

import {EventsService} from '../services/events/events.service';
import {UsersService} from '../services/users/users.service';

import {environment} from '../../environments/environment';


@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.css']
})

export class EventDetailComponent implements OnInit {
    eid = null;
    event = null;
    imageUrl = null;

    constructor(private activatedRoute: ActivatedRoute, private eventsService: EventsService, private user: UsersService, private router: Router) {
    }


    sub = this.activatedRoute.params.subscribe(params => {
        this.eid = params['eid'];
    });


    ngOnInit() {
        this.eventsService.getEvent(this.eid).pipe(map(data => data)).subscribe((data) => {
            this.event = data['Events'];
        });

        this.imageUrl = environment.IMAGE_URL;
    }

    saveEvent(eid, button) {
        event.stopPropagation();

        this.user.saveEvent(eid).subscribe(data => {

            if (button.src.includes("/assets/images/bookmark_icon_for_saved_events_green.png")) {
                button.src = "/assets/images/bookmark_icon_for_saved_events_gray.png";
            } else {
                button.src = "/assets/images/bookmark_icon_for_saved_events_green.png";
            }

        });

    }
}
