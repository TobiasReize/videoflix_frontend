import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormService } from '../../services/form-service/form.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';
import { ToastMsgComponent } from '../../shared/toast-msg/toast-msg.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ToastMsgComponent, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  formService = inject(FormService);
  toastMsgService = inject(ToastMsgService);
  

  onSubmit(ngForm: NgForm) {
    this.formService.formSubmit('forgot-password', ngForm);
  }

}
