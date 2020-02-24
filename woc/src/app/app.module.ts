//General Imports
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {UsersService} from './services/users/users.service';
import {EventsService} from './services/events/events.service';
import {CookieService} from 'ngx-cookie-service';

//Component imports
import {TemplateComponent} from './template/template.component';
import {UsersComponent} from './dashboard/users/users.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './user/register/register.component';
import {LoginComponent} from './user/login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EventsComponent} from './events/events.component';
import {SavedComponent} from './user/saved/saved.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {CreateeventsComponent} from './dashboard/createevents/createevents.component';
import {SettingsComponent} from './user/settings/settings.component';
import {EditeventsComponent} from './dashboard/editevents/editevents.component';
import {CategoryEventsComponent} from './category-events/category-events.component';
import {TokenInterceptorService} from './services/tokenHandler/token-interceptor.service';
import {AuthComponent} from './user/auth.component';
import {NotfoundComponent} from "./error/notfound/notfound.component";
import {UnathorizedComponent} from './error/unathorized/unathorized.component';

//Design imports
import 'hammerjs';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTreeModule,
    MatExpansionModule
} from '@angular/material';
import {ChangePasswordComponent} from './user/settings/change-password/change-password.component';
import {TosComponent} from './legal/tos/tos.component';
import {PrivacyComponent} from './legal/privacy/privacy.component';
import { EditeventComponent } from './dashboard/editevent/editevent.component';
import { ResetComponent } from './user/reset/reset.component';
import { ActivateComponent } from './user/settings/activate/activate.component';

@NgModule({
    declarations: [
        AppComponent,
        //Components imports
        TemplateComponent,
        RegisterComponent,
        LoginComponent,
        DashboardComponent,
        EventsComponent,
        SavedComponent,
        EventDetailComponent,
        CreateeventsComponent,
        EditeventsComponent,
        CategoryEventsComponent,
        AuthComponent,
        NotfoundComponent,
        UnathorizedComponent,
        UsersComponent,
        HomeComponent,
        SettingsComponent,
        ChangePasswordComponent,
        TosComponent,
        PrivacyComponent,
        EditeventComponent,
        ResetComponent,
        ActivateComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        //Material Imports
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatCheckboxModule,
        MatGridListModule,
        MatIconModule,
        MatNativeDateModule,
        MatSidenavModule,
        FlexLayoutModule,
        MatListModule,
        MatMenuModule,
        MatTabsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatTreeModule,
        MatExpansionModule
    ],
    exports: [
        MatSidenavModule,
    ],
    providers: [
        AuthService,
        AuthGuard,
        EventsService,
        UsersService,
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
