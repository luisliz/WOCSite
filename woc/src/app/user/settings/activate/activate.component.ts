import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../services/users/users.service";

@Component({
    selector: 'app-activate',
    templateUrl: './activate.component.html',
    styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
    errorMessage;
    invalid = false;
    resent = false;
    activated = false;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private users: UsersService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['token']) {
                var token = params['token'];

                this.users.activateAccount(token).subscribe(
                    data => {
                        this.errorMessage = "";
                        this.resent = false
                        this.invalid = false;
                        this.activated = true
                    },
                    error => {
                        this.activated = false;
                        this.resent = false;
                        this.invalid = true;
                        this.errorMessage = error.error.response;
                        if(!this.errorMessage) {
                            this.errorMessage = "Invalid Activation Link"
                        }
                    }
                );
            }
        });
    }

    resendActivation() {
        this.activatedRoute.params.subscribe(params => {
            if (params['token']) {
                var token = params['token'];

                this.activated = false;
                this.resent = false;
                this.invalid = true;

                this.errorMessage = "Resending Activation"

                this.users.resendactivation(token).subscribe(
                    data => {
                        this.errorMessage = "";
                        this.activated = false;
                        this.resent = true;
                        this.invalid = false;
                    },
                    error => {
                        this.invalid = true;
                        this.resent = false;
                        this.errorMessage = error.error.response;
                    }
                );
            }
        });
    }
}
