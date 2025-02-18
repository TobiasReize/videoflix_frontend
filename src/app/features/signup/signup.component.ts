import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ToastMsgComponent } from '../../shared/toast-msg/toast-msg.component';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';
import { FormService } from '../../services/form-service/form.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, ToastMsgComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  
  toastMsgService = inject(ToastMsgService);
  formService = inject(FormService);
  isPasswordVisible: boolean = false;
  isPasswordRepeatVisible: boolean = false;


  ngOnInit(): void {
    this.toastMsgService.resetToastMsg();
  }


  showPassword(id: string, state: boolean) {
    if (id == 'password') {
      if (state == true) {
        this.isPasswordVisible = true;
      } else {
        this.isPasswordVisible = false;
      }
    } else {
      if (state == true) {
        this.isPasswordRepeatVisible = true;
      } else {
        this.isPasswordRepeatVisible = false;
      }
    }
  }


  onSubmit(ngForm: NgForm) {
    this.formService.formSubmit('signup', ngForm);
  }

  
}
