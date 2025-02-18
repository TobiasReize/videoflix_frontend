import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ToastMsgComponent } from '../../shared/toast-msg/toast-msg.component';
import { FormsModule, NgForm } from '@angular/forms';
import { FormService } from '../../services/form-service/form.service';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ToastMsgComponent, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

    formService = inject(FormService);
    toastMsgService = inject(ToastMsgService);
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
      this.formService.formSubmit('reset-password', ngForm);
    }

}
