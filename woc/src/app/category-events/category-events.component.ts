import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

import {EventsService} from '../services/events/events.service';
import {UsersService} from '../services/users/users.service';

@Component({
    selector: 'app-category-events-component',
    templateUrl: '../events/events.component.html',
    styleUrls: ['../events/events.component.css']
})

export class CategoryEventsComponent implements OnInit {
    events = null;
    category = null;
    categories = this.eventsService.getCategories();
    page;
    prevPage;
    nextPage;
    disPrevPage = false;
    disNextPage = false;
    link = "events/categories/Business";

    constructor(private activatedRoute: ActivatedRoute, private eventsService: EventsService, private user: UsersService, private router: Router) {
        this.activatedRoute.params.subscribe(params => {


            if (params['page']) {
                this.page = +params['page'];
            } else {
                this.page = 1;
            }

            if (params['category'] != this.category) {
                this.category = params['category'];
            }

            this.prevPage = this.page - 1;
            this.nextPage = this.page + 1;

            if (this.prevPage < 1) {
                this.disPrevPage = true;
            }

            this.getCategoryEvents();

        });
        this.link = "events/categories/" + this.category;
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.category = params['category'];
        });
        this.getCategoryEvents();
    }

    getCategoryEvents() {
        this.eventsService.getCategoryEvents(this.page, this.category).pipe(map(data => data)).subscribe((data) => {
            this.events = data['Events'];
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
}
