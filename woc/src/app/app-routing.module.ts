import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {TemplateComponent} from './template/template.component';
import {EventsComponent} from './events/events.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {SavedComponent} from './user/saved/saved.component';
import {CategoryEventsComponent} from './category-events/category-events.component';
import {AuthComponent} from './user/auth.component';

import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateeventsComponent} from './dashboard/createevents/createevents.component';
import {EditeventsComponent} from './dashboard/editevents/editevents.component';
import {UsersComponent} from "./dashboard/users/users.component";

import {NotfoundComponent} from "./error/notfound/notfound.component";
import {UnathorizedComponent} from "./error/unathorized/unathorized.component";
import {AuthGuard} from './guards/auth.guard';
import {AssocGuard} from "./guards/assoc.guard";
import {AdminGuard} from "./guards/admin.guard";
import {HomeComponent} from "./home/home.component";
import {SettingsComponent} from './user/settings/settings.component';
import {ChangePasswordComponent} from './user/settings/change-password/change-password.component';
import {TosComponent} from "./legal/tos/tos.component";
import {PrivacyComponent} from "./legal/privacy/privacy.component";
import {EditeventComponent} from "./dashboard/editevent/editevent.component";
import {ActivateComponent} from "./user/settings/activate/activate.component";
import {ResetComponent} from "./user/reset/reset.component";


const routes: Routes = [
    {
        path: '', component: TemplateComponent,
        children: [
            {path: '', component: HomeComponent},
            {path: 'events', component: EventsComponent},
            {path: 'events/:page', component: EventsComponent},
            {path: 'event/:eid', component: EventDetailComponent},
            {path: 'events/categories/:category', component: CategoryEventsComponent},
            {path: 'saved', component: SavedComponent, canActivate: [AuthGuard]},
            {
                path: 'settings', component: SettingsComponent, canActivate: [AuthGuard],
                children: [
                    {path: 'change', component: ChangePasswordComponent}
                ]
            },

            {path: 'confirm/:token', component: ActivateComponent},

            {path: 'privacy', component: PrivacyComponent},
            {path: 'tos', component: TosComponent},

            {path: '404', component: NotfoundComponent},
            {path: '401', component: UnathorizedComponent},
        ]
    },
    {
        path: '', component: AuthComponent,
        children: [
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'resetpassword', component: ResetComponent},
            {path: 'resetpassword/:token', component: ResetComponent},
        ]
    },


    {
        path: 'dashboard', component: DashboardComponent,
        children: [
            {path: 'create', component: CreateeventsComponent, canActivate: [AssocGuard]},
            {path: 'edit', component: EditeventsComponent, canActivate: [AssocGuard]},
            {path: 'edit/:eid', component: EditeventComponent, canActivate: [AssocGuard]},
            {path: 'users', component: UsersComponent, canActivate: [AdminGuard]}
        ],
        canActivate: [AuthGuard]
    },

    // otherwise redirect to template
    {path: '**', redirectTo: '/404'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
