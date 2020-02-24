import {Component, OnInit, ViewChild} from '@angular/core';
import {AssociationsService} from "../../services/associations/associations.service";
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {environment} from "../../../environments/environment";


export interface Event {
    eid: String,
    title: String,
    categoryName: String,
    place: String,
    dateTimestamp: Date,
    startHour: Date,
    endHour: Date
}

@Component({
    selector: 'app-editevents',
    templateUrl: './editevents.component.html',
    styleUrls: ['./editevents.component.scss']
})

export class EditeventsComponent implements OnInit {
    oldEventsObs;
    activeEventObs;
    oldEventSource = new MatTableDataSource<Event>();
    activeEventSource = new MatTableDataSource<Event>();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private associationService: AssociationsService) {}

    ngOnInit() {
        this.getAssocEvents();

        this.activeEventObs = this.activeEventSource.connect();

        this.oldEventSource.paginator = this.paginator;
        this.oldEventsObs = this.oldEventSource.connect();
    }

    getAssocEvents() {
        this.associationService.getAssocEvents().subscribe((data) => {
            var events = data['Events'];
            var oldEvents = [];
            var activeEvents = [];
            var j = 0;
            var k = 0;
            for (var i = 0; i < events.length; i++) {
                events[i].imageurl = environment.IMAGE_URL + events[i].imageurl;

                var tempDate = new Date(events[i].dateTimestamp);
                if(tempDate.getTime()< Date.now()) {
                    oldEvents[j] = events[i];
                    j++;
                } else {
                    activeEvents[k] = events[i];
                    k++;
                }
            }
            this.oldEventSource.data = oldEvents;
            this.activeEventSource.data = activeEvents;
        });
    }
}

