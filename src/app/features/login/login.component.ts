import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastErrorComponent } from '../../shared/toast-error/toast-error.component';
import { ToastErrorService } from '../../services/toast-error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, HeaderComponent, FooterComponent, ToastErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  isPasswordVisible: boolean = false;
  toastErrorMsg: string = '';
  toastErrorSerivce = inject(ToastErrorService);
  @ViewChild('checkbox') checkbox!: ElementRef;

  ngOnInit(): void {
    this.toastErrorSerivce.resetToastError();
  }


  showPassword(state:boolean) {
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
        this.toastErrorSerivce.resetToastError();
        this.emptyForm(ngForm);
      } else {
        console.log('Fehler!!!');
        this.toastErrorMsg = 'Invalid e-mail or password! Please try again!';
        this.toastErrorSerivce.resetToastError();
        setTimeout(() => {
          this.toastErrorSerivce.setToastError();
        }, 100);
        this.emptyForm(ngForm);
      }
  }


  emptyForm(ngForm: NgForm) {
    ngForm.resetForm();    
    this.checkbox.nativeElement.checked = false;
  }

}
