import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastMsgComponent } from '../../shared/toast-msg/toast-msg.component';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service/login.service';

@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [FormsModule, ToastMsgComponent, HeaderComponent, FooterComponent],
  templateUrl: './startpage.component.html',
  styleUrl: './startpage.component.scss'
})
export class StartpageComponent implements OnInit {

  toastMsgService = inject(ToastMsgService);
  loginService = inject(LoginService);
  signUpEmail: string = '';


  constructor(private router: Router) { }


  ngOnInit(): void {
    this.toastMsgService.resetToastMsg();
  }


  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.toastMsgService.resetToastMsg();
      this.loginService.setSignupEmail(this.signUpEmail);
      console.log('signUpEmail:', this.signUpEmail);
      ngForm.resetForm();
      this.router.navigateByUrl('signup');
    } else {
      console.log('Fehler!!!');
      ngForm.resetForm();
      this.loginService.setSignupEmail('');
      this.toastMsgService.resetToastMsg();
      setTimeout(() => {
        this.toastMsgService.showToastMsg('error', 'Please enter a valid e-mail address!');
      }, 100);
    }
  }

}
