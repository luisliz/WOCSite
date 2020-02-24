import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {EventsService} from '../../services/events/events.service';
import {map} from 'rxjs/operators';
import {FormControl, Validators} from '@angular/forms';

import flatpickr from 'flatpickr';
import * as moment from "moment";
import {formatDate} from "@angular/common";

@Component({
    selector: 'app-createevents',
    templateUrl: './createevents.component.html',
    styleUrls: ['./createevents.component.scss'],
})

export class CreateeventsComponent implements OnInit {
    locationTitle = "Create";
    errorMessage;
    user;
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

    constructor(private auth: AuthService, private events: EventsService, private router: Router) {
    }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            this.event.postedUid = this.auth.getToken();
        }
        this.events.getCategories().pipe(map(data => data)).subscribe((data) => {
            this.categories = data['Categories'];
        });

        this.user = {'username': this.auth.getUsername()};

        var date = this.event.dateTimestamp = formatDate(new Date(), "yyyy-MM-dd","en-US" )
        flatpickr('#date', {
            altInput: true,
            altFormat: 'F j, Y',
            minDate: 'today',
            dateFormat: 'Y-m-d',
            defaultDate: date,
        });

        var sHour = this.event.startHour = "10:30";
        flatpickr('#start_time_hour', {
            enableTime: true,
            noCalendar: true,
            altInput: true,
            altFormat: 'h:i K',
            dateFormat: 'H:i',
            defaultDate: sHour,
        });

        var eHour = this.event.endHour = "12:30";
        flatpickr('#end_time_hour', {
            enableTime: true,
            noCalendar: true,
            altInput: true,
            altFormat: 'h:i K',
            dateFormat: 'H:i',
            defaultDate: eHour,
        });
    }

    /* TimezoneDetect() {
         var dtDate = new Date('1/1/' + (new Date()).getUTCFullYear());
         var intOffset = 10000; //set initial offset high so it is adjusted on the first attempt
         var intMonth;
         var intHoursUtc;
         var intHours;
         var intDaysMultiplyBy;

         // Go through each month to find the lowest offset to account for DST
         for (intMonth = 0; intMonth < 12; intMonth++) {
             //go to the next month
             dtDate.setUTCMonth(dtDate.getUTCMonth() + 1);

             // To ignore daylight saving time look for the lowest offset.
             // Since, during DST, the clock moves forward, it'll be a bigger number.
             if (intOffset > (dtDate.getTimezoneOffset() * (-1))) {
                 intOffset = (dtDate.getTimezoneOffset() * (-1));
             }
         }

         return dtDate.toString().match(/([-\+][0-9]+)\s/)[0].replace(/^\s+|\s+$/g, '');
     }*/

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

    // onFileSelected(event) {
    //     this.image = <File>event.target.files[0];
    //
    //     // const reader = new FileReader();
    //     // reader.onload = e => this.imageSrc = reader.result;
    //     //
    //     // reader.readAsDataURL(this.image);
    // }

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
        this.events.createEvent(title, place, briefDescription, fullDescription, startHour, endHour, categoryName, imageurl, postedUid, contactEmail, contactPhone)
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
                console.log(this.errorMessage);
            }
        );
    }
}
