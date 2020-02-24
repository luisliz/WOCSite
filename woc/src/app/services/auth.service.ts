import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {map} from 'rxjs/operators';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private base_url = environment.API_URL;

    ranks;
    handleError

    constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {

    }

    isLoggedIn() {
        return this.cookieService.get('loggedIn') ? true : false;
    }

    getToken() {
        return this.cookieService.get('token');
    }

    getUsername() {
        return this.cookieService.get('username');
    }

    getRank() {
        return this.http.get(this.base_url + 'ranks');
    }

    logout() {
        this.destroySession();
        this.router.navigate(['/login']);
    }

    destroySession() {
        this.cookieService.delete('loggedIn');
        this.cookieService.delete('token');
        this.cookieService.delete('username');
    }

    setSession(cookieName, data) {
        this.cookieService.set(cookieName, data);
    }

    logUserIn(data) {
        //var data = data['User'];
        this.setSession('token', data.access_token);
        this.setSession('loggedIn', true);
        this.setSession('username', data['displayname']);

        window.location.href = "/events";
    }

    getUserDetails(email, password) {
        const body = new HttpParams().set('email', email).set('password', password);

        return this.http.post(this.base_url + 'mobile/login', body.toString(),
            {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')});
    }


    registerUser(displayName, email, password, firstName, lastName) {
        var userRegister = new HttpParams().set('displayname', displayName)
            .set('email', email)
            .set('password', password)
            .set('firstname', firstName)
            .set('lastname', lastName);

        return this.http.post(this.base_url + 'mobile/register', userRegister.toString(),
            {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            });
    }

    changePassword(currentPassword, newPassword, newPasswordConfirmation) {
        var passwordChange = new HttpParams().set('currentPassword', currentPassword)
            .set('newPassword', newPassword)
            .set('confirmPassword', newPasswordConfirmation);

        return this.http.post(this.base_url + 'changepassword', passwordChange.toString(),
            {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            });
    }
}
