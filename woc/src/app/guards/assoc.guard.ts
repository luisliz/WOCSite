import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {catchError, map, retry} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AssocGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        //Checks if its admin or assoc
        this.authService.getRank().subscribe(data => {
            var ranks = data['Ranks'];
            console.log("assoc " + ranks);
            if ((ranks.indexOf(2) < 0 && ranks.indexOf(1) < 0)) {
                this.router.navigate(['/401']);
                return false;
            }
        });
        return true;
    }
}
