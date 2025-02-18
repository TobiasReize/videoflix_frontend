import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastMsgComponent } from '../../shared/toast-msg/toast-msg.component';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormService } from '../../services/form-service/form.service';

@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [FormsModule, ToastMsgComponent, HeaderComponent, FooterComponent],
  templateUrl: './startpage.component.html',
  styleUrl: './startpage.component.scss'
})
export class StartpageComponent implements OnInit {

  toastMsgService = inject(ToastMsgService);
  formService = inject(FormService);
  signUpEmail: string = '';


  constructor() { }


  ngOnInit(): void {
    this.toastMsgService.resetToastMsg();
  }


  onSubmit(ngForm: NgForm) {
    this.formService.setSignupEmail(this.signUpEmail);
    this.formService.formSubmit('startpage', ngForm);
  }

}
