import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../auth.component.scss']
})

export class LoginComponent implements OnInit {
    errorMessage;

    title = 'Login';

    user = {
        email: '',
        password: ''
    };
    isLogin = true;


    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email
    ]);
    passwordFormControl = new FormControl('', [
        Validators.required,
    ]);

    constructor(private router: Router, private auth: AuthService) {
    }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['/events']);
        }
    }

    loginUser() {
        var email = this.user.email;
        var password = this.user.password;

        this.auth.getUserDetails(email, password).subscribe(
            data => {
                this.errorMessage = "";
                console.log(data);
                this.auth.logUserIn(data);
            },
            error => {
                this.errorMessage = error.error.response;
            }
        );
    }

    goToRegister() {
        window.location.href = "/register";
    }
}
