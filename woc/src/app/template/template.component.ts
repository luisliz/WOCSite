import {Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {EventsService} from '../services/events/events.service';
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
    selector: 'app-home',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.scss']
})


export class TemplateComponent implements OnInit {
    signedIn;
    user = this.authService.getUsername();
    isAdmin = false;
    isAssoc = false;
    private base_url = environment.API_URL;
    categories;

    @ViewChild('drawer') snav;
    mobileQuery: MediaQueryList;
    isExpanded: boolean = true;

    constructor(private elementRef: ElementRef, private eventsService: EventsService, private authService: AuthService, private router: Router,
                private http: HttpClient, private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {

        this.signedIn = this.authService.isLoggedIn ? true : false;

        this.mobileQuery = media.matchMedia('(max-width: 970px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.eventsService.getCategories().pipe(map(data => data)).subscribe((data) => {
            this.categories = data['Categories'];
        });

        this.authService.getRank().subscribe(data => {
            var ranks = data['Ranks'];

            if (ranks.indexOf(1) != -1) {
                this.isAdmin = true;
                this.isAssoc = true;
            } else if (ranks.indexOf(2) != -1) {
                this.isAssoc = true;
            }
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    private _mobileQueryListener: () => void;

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    /**
     * This method is use to open side nav on mobile view
     */
    openSideNav() {
        if (this.mobileQuery.matches) {
            this.isExpanded = true;
            this.snav.opened = true;
        }
    }

    mobileMenuClick() {
        var x = document.getElementById("menu");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    /*
    addCategoriesToCategoriesTab(){
      database.ref("assets/categories").once('value').then( function(categories){
         categories.forEach(function(snapshot){
          $("#categories_tab_container").append("<button class=\"category_option_button dropdown_option\" name="+snapshot.val()+">"+snapshot.val()+"</button>");
        });
      });
    }*/

}
