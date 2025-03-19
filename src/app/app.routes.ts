import { Routes } from '@angular/router';
import { StartpageComponent } from './features/startpage/startpage.component';
import { ImprintComponent } from './features/imprint/imprint.component';
import { PrivacyPolicyComponent } from './features/privacy-policy/privacy-policy.component';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';
import { VideoOfferComponent } from './features/video-offer/video-offer.component';
import { VideoplayerComponent } from './features/videoplayer/videoplayer.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';


export const routes: Routes = [
    { path: '', component: StartpageComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'video-offer', component: VideoOfferComponent },
    { path: 'videoplayer', component: VideoplayerComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: '**', component: PageNotFoundComponent },
];
