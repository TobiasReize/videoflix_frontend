import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastMsgComponent } from '../../shared/toast-msg/toast-msg.component';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';
import { FormService } from '../../services/form-service/form.service';

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
  private activeRoute = inject(ActivatedRoute);
  @ViewChild('checkbox') checkbox!: ElementRef;

  
  ngOnInit(): void {
    this.toastMsgService.resetToastMsg();
    if (this.activeRoute.snapshot.queryParamMap.get('confirmed') === 'true') {
      this.toastMsgService.showToastMsg('ok', 'Account activated!');
    }
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


}
