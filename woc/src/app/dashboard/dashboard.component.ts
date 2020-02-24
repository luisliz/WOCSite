import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    isAdmin = false;

    username = "";

    @ViewChild('drawer') snav;
    mobileQuery: MediaQueryList;
    isExpanded: boolean = true;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher, private authService: AuthService) {

        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.authService.getRank().subscribe(data => {
            this.username = this.authService.getUsername();
            var ranks = data['Ranks'];

            if (ranks.indexOf(1) != -1) {
                this.isAdmin = true;
            }
        });
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

}

