import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {EventsService} from "../../services/events/events.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";

import flatpickr from 'flatpickr';
import * as moment from "moment";
import {environment} from "../../../environments/environment";
import {AssociationsService} from "../../services/associations/associations.service";
import {DatePipe, formatDate} from "@angular/common";

@Component({
    selector: 'app-editevent',
    templateUrl: '../createevents/createevents.component.html',
    styleUrls: ['../createevents/createevents.component.scss']
})
export class EditeventComponent implements OnInit {
    locationTitle = "Edit";
    forbidden = true;
    errorMessage;
    user;
    eid;
    imageUrl;
    event = {
        title: '',
        briefDescription: '',
        fullDescription: '',
        startHour: '',
        sampm: 'AM',
        endHour: '',
        eampm: 'AM',
        place: '',
        dateTimestamp: '',
        categoryName: '',
        contactEmail: '',
        contactPhone: '',
        postedUid: '',
        imageurl: ''
    };

    tempSHour;
    tempEHour;
    tempDate: Date;

    image: File = null;
    imageSrc: String;
    imagePath = null;
    url;
    result: EventTarget;
    breakpoint8: number;
    breakpoint6: number;
    breakpoint2: number;

    categories;

    showProgressBar = false;

    generalFormControl = new FormControl('', [
        Validators.required
    ]);

    locationFormControl = new FormControl('', [
        Validators.maxLength(45),
        Validators.required
    ]);

    categoryFormControl = new FormControl('', [
        Validators.required
    ]);

    fullDescFormControl = new FormControl('', [
        Validators.required
    ]);

    titleFormControl = new FormControl('', [
        Validators.maxLength(50),
        Validators.required
    ]);

    briefFormControl = new FormControl('', [
        Validators.maxLength(150),
        Validators.required
    ]);

    phoneFormControl = new FormControl('', [
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.required,
        Validators.pattern('^[0-9]*$'),

    ]);

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    stimeFormControl = new FormControl('', [
        Validators.required,
    ]);

    etimeFormControl = new FormControl('', [
        Validators.required,
    ]);

    sub = this.activatedRoute.params.subscribe(params => {
        this.eid = params['eid'];
    });

    constructor(private auth: AuthService, private events: EventsService, private assoc: AssociationsService,
                private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            this.event.postedUid = this.auth.getToken();
        }

        this.events.getCategories().pipe(map(data => data)).subscribe((data) => {
            this.categories = data['Categories'];
        });

        this.user = {'username': this.auth.getUsername()};

        this.assoc.getEditEvent(this.eid).pipe(map(data => data)).subscribe((data) => {
            this.event = data['Events'];

            this.url = environment.IMAGE_URL + this.event.imageurl;

            var date = new Date(this.event.dateTimestamp);
            flatpickr('#date', {
                altInput: true,
                altFormat: 'F j, Y',
                minDate: 'today',
                dateFormat: 'Y-m-d',
                defaultDate: formatDate(date, "yyyy-MM-dd", "en-US")
            });

            var sHour = this.event.startHour = formatDate(this.event.startHour, "HH:mm", "en-US")
            flatpickr('#start_time_hour', {
                enableTime: true,
                noCalendar: true,
                altInput: true,
                altFormat: 'h:i K',
                dateFormat: 'H:i',
                defaultDate: sHour
            });

            var eHour = this.event.endHour = formatDate(this.event.endHour, "HH:mm", "en-US")
            flatpickr('#end_time_hour', {
                enableTime: true,
                noCalendar: true,
                altInput: true,
                altFormat: 'h:i K',
                dateFormat: 'H:i',
                defaultDate: eHour
            });
        });
    }

    onSelectFile(event) { // called each time file input changes
        if (event.target.files && event.target.files[0]) {
            this.image = <File>event.target.files[0];

            var reader = new FileReader();
            reader.onload = (event: ProgressEvent) => {
                this.url = (<FileReader>event.target).result;
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    createEvent() {
        var d = new Date(this.event.dateTimestamp);
        d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000); //do not remove. helps with offset of time

        var title = this.event.title;
        var imageurl = this.image;
        var briefDescription = this.event.briefDescription;
        var fullDescription = this.event.fullDescription;
        var startHour = formatDate(d, "yyyy-MM-dd "+this.event.startHour+":00.000000ZZ","en-US" )
        var endHour = formatDate(d, "yyyy-MM-dd "+this.event.endHour+":00.000000ZZ","en-US" )
        var place = this.event.place;
        var categoryName = this.event.categoryName;
        var contactEmail = this.event.contactEmail;
        var contactPhone = this.event.contactPhone;
        var postedUid = this.event.postedUid;

        this.showProgressBar = true;

        /*if (title == "" || briefDescription == "") {
            this.errorMessage = "error in the form";
        } else {*/

        this.assoc.updateEvent(this.eid, title, place, briefDescription, fullDescription, startHour, endHour, categoryName,
            imageurl, postedUid, contactEmail, contactPhone)
            .toPromise().then((data) => {
                if (Boolean(data['success'])) {
                    this.errorMessage = '';
                    this.showProgressBar = false;
                    this.router.navigate(['/dashboard/edit']);
                }
            },
            error => {
                this.showProgressBar = false;
                this.errorMessage = error.error.response;
            }
        );
    }

    private timeChange() {
        var d = new Date(Date.now());
        d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);

        this.tempSHour = moment(new Date(d)).format("YYYY-MM-DD " + this.event.startHour + ":00.0ZZ");
        this.tempEHour = moment(new Date(d)).format("YYYY-MM-DD " + this.event.endHour + ":00.0ZZ");

        if(this.event.dateTimestamp) {
            this.tempDate = new Date(this.event.dateTimestamp);
        }
    }
}
