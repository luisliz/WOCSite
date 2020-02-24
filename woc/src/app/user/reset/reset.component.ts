import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['../auth.component.scss']
})
export class ResetComponent implements OnInit {
    errorMessage;

    title = 'Reset';

    token;
    email = '';

    passwords = {
        current: '',
        new: '',
        confirm: ''
    };

    sent = false;
    change = false;
    changed = false;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email
    ]);

    passwordFormControl = new FormControl('', [
        Validators.required,
    ]);

    confirmFormControl = new FormControl('', [
        Validators.required,
    ]);
    constructor(private router: Router, private auth: AuthService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['/settings/change']);
        }
        this.activatedRoute.params.subscribe(params => {
            if (params['token']) {
                this.token = params['token'];
                this.change = true;
                //this.auth.resetChangePassword(token,)
            }
        });
    }

    resetPassword() {
        this.auth.resetPassword(this.email).subscribe(
            data => {
                this.sent = true;
                this.errorMessage = "";
            },
            error => {
                this.errorMessage = error.error.response;
            }
        );
    }

    resetChangePassword() {
        this.auth.resetChangePassword(this.token, this.passwords.new, this.passwords.confirm).subscribe(
            data => {
                this.changed = true;
                this.errorMessage = "";
                this.router.navigate(['/events']);
            },
            error => {
                this.errorMessage = error.error.response;
            }
        );
    }
}
