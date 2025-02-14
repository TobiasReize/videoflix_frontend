import { Routes } from '@angular/router';
import { StartpageComponent } from './features/startpage/startpage.component';
import { ImprintComponent } from './features/imprint/imprint.component';
import { PrivacyPolicyComponent } from './features/privacy-policy/privacy-policy.component';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';


export const routes: Routes = [
    { path: '', component: StartpageComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    // { path: 'forgot-password', },
    // { path: 'reset-password', },
    // { path: 'video-offer', },
    { path: 'imprint', component: ImprintComponent},
    { path: 'privacy-policy', component: PrivacyPolicyComponent},
];
