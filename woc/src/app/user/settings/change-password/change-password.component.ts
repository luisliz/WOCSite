import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    errorMessage;

    error = false;
    success = false;

    passwords = {
        current: '',
        new: '',
        confirm: ''
    };

    changePassForm: FormGroup;

    passwordFormControl = new FormControl('', [
        Validators.required,
    ]);

    newFormControl = new FormControl('', [
        Validators.required,
        Validators.min(8)
    ]);

    confirmFormControl = new FormControl('', [
        Validators.required,
    ]);

    constructor(private router: Router, private auth: AuthService, private formBuilder: FormBuilder) {
        this.changePassForm = this.formBuilder.group({
                password: this.passwordFormControl,
                newpassword: this.newFormControl,
                passwordConfirm: this.confirmFormControl
            }, {
                validator: [
                    this.checkIfMatchingPasswords('newpassword', 'passwordConfirm'),
                    this.checkIfNotMatchingPasswords('password', 'newpassword'),
                ],
            }
        );
    }

    ngOnInit() {
    }

    changePassword() {
        if (!this.changePassForm.invalid) {
            this.auth.changePassword(this.passwords.current, this.passwords.new, this.passwords.confirm).subscribe(
                data => {
                    this.success = true;
                    this.error = false;
                },
                error => {
                    this.error = true;
                    this.errorMessage = error.error.response;
                }
            );
        }
    }


    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];

            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({notEquivalent: true});
            } else {
                return passwordConfirmationInput.setErrors(null);
            }
        };
    }

    checkIfNotMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];

            if (passwordInput.value === passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({equivalent: true});
            } else {
                return passwordConfirmationInput.setErrors(null);
            }
        };
    }
}
