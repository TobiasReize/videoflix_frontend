import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { ToastMsgComponent } from '../../shared/toast-msg/toast-msg.component';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';
import { FormService } from '../../services/form-service/form.service';
import { ApiService } from '../../services/api-service/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, HeaderComponent, FooterComponent, ToastMsgComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  isPasswordVisible: boolean = false;
  toastMsgService = inject(ToastMsgService);
  formService = inject(FormService);
  apiService = inject(ApiService);
  router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  @ViewChild('checkbox') checkbox!: ElementRef;

  
  ngOnInit(): void {
    this.toastMsgService.resetToastMsg();
    this.checkQueryParam();
    this.checkRememberMe();
  }


  showPassword(state: boolean) {
    if (state == true) {
      this.isPasswordVisible = true;
    } else {
      this.isPasswordVisible = false;
    }
  }


  onSubmit(ngForm: NgForm) {
    this.formService.formSubmit('login', ngForm);
    this.checkbox.nativeElement.checked = false;
  }


  guestLogin() {
    const payload = {
      email: environment.guest.EMAIL,
      password: environment.guest.PASSWORD
    };
    this.apiService.postData(environment.config.LOGIN_URL, payload).subscribe({
      next: data => {
        this.router.navigateByUrl('video-offer');
      },
      error: err => this.toastMsgService.setToastMsg('error', 'An error occurred. Please try again.'),
    });
  }


  checkQueryParam() {
    if (this.activeRoute.snapshot.queryParamMap.get('confirmed') == 'true') {
      this.toastMsgService.showToastMsg('ok', 'Account activated!');
    }
    if (this.activeRoute.snapshot.queryParamMap.get('token') == 'expired') {
      this.toastMsgService.showToastMsg('error', 'Token expired, account removed!');
    }
    if (this.activeRoute.snapshot.queryParamMap.get('token') == 'invalid') {
      this.toastMsgService.showToastMsg('error', 'Token invalid!');
    }
    if (this.activeRoute.snapshot.queryParamMap.get('credentials') == 'false') {
      this.toastMsgService.showToastMsg('error', 'No valid credentials!');
    }
  }


  checkRememberMe() {
    if (sessionStorage.getItem('remember_me') == 'true') {
      this.router.navigateByUrl('video-offer');
    }
  }
}
