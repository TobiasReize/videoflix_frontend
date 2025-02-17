import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastMsgComponent } from '../../shared/toast-msg/toast-msg.component';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, HeaderComponent, FooterComponent, ToastMsgComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  isPasswordVisible: boolean = false;
  toastMsgSerivce = inject(ToastMsgService);
  @ViewChild('checkbox') checkbox!: ElementRef;

  
  ngOnInit(): void {
    this.toastMsgSerivce.resetToastMsg();
  }


  showPassword(state: boolean) {
    if (state == true) {
      this.isPasswordVisible = true;
    } else {
      this.isPasswordVisible = false;
    }
  }


  onSubmit(ngForm: NgForm) {
      if (ngForm.submitted && ngForm.form.valid) {
        // tbd.
        console.log('Form:', ngForm.form.value);
        this.toastMsgSerivce.resetToastMsg();
        this.emptyForm(ngForm);
      } else {
        console.log('Fehler!!!');
        this.toastMsgSerivce.resetToastMsg();
        setTimeout(() => {
          this.toastMsgSerivce.showToastMsg('error', 'Invalid e-mail or password! Please try again!');
        }, 100);
        this.emptyForm(ngForm);
      }
  }


  emptyForm(ngForm: NgForm) {
    ngForm.resetForm();    
    this.checkbox.nativeElement.checked = false;
  }

}
