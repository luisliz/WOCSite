import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"; // Updated for Angular 6/RxJS 6

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['../auth.component.scss']
})

export class RegisterComponent implements OnInit {
    title = 'Registration';
    errorMessage;

    register = {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        username: '',
        password: '',
        password2: ''
    };

    registerForm: FormGroup;

    firstNameFormControl = new FormControl('', [
        Validators.required,
    ]);

    lastNameFormControl = new FormControl('', [
        Validators.required,
    ]);

    usernameFormControl = new FormControl('', [
        Validators.required
    ]);

    passwordFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')
    ]);

    confirmPasswordFormControl = new FormControl('', [
        Validators.required,
        //need password comfirmation
    ]);

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email
    ]);

    constructor(private router: Router, private auth: AuthService, private formBuilder: FormBuilder,) {
        this.registerForm = this.formBuilder.group({
                firstname: this.lastNameFormControl,
                lastname: this.firstNameFormControl,
                username: this.usernameFormControl,
                email: this.emailFormControl,
                password: this.passwordFormControl,
                passwordConfirm: this.confirmPasswordFormControl
            }, {
                validator: this.checkIfMatchingPasswords('password', 'passwordConfirm')
            }
        );
    }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['/']);
        }
    }

    registerUser() {
        var displayName = this.register.username;
        var email = this.register.email;
        var password = this.register.password;
        var firstName = this.register.firstName;
        var lastName = this.register.lastName;

        this.auth.registerUser(displayName, email, password, firstName, lastName).subscribe(
            data => {

                this.auth.logUserIn(data);
            },
            error => {
                this.errorMessage = error.error.response;
            }
        );
    }

    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];

            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({notEquivalent: true})
            } else {
                return passwordConfirmationInput.setErrors(null);
            }
        }
    }
}
