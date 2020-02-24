import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {environment} from "../environments/environment";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'app';

    constructor() {
    }

}
