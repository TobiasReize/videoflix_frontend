import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastErrorComponent } from '../../shared/toast-error/toast-error.component';
import { ToastErrorService } from '../../services/toast-error.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [FormsModule, ToastErrorComponent, HeaderComponent, FooterComponent],
  templateUrl: './startpage.component.html',
  styleUrl: './startpage.component.scss'
})
export class StartpageComponent implements OnInit {

  toastErrorSerivce = inject(ToastErrorService);
  signUpEmail: string = '';
  toastErrorMsg: string = '';


  ngOnInit(): void {
    this.toastErrorSerivce.resetToastError();
  }
  

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      // tbd.
      this.toastErrorSerivce.resetToastError();
      console.log('signUpEmail:', this.signUpEmail);
      ngForm.resetForm();
    } else {
      console.log('Fehler!!!');
      this.toastErrorMsg = 'Please enter a valid e-mail address';
      this.toastErrorSerivce.resetToastError();
      setTimeout(() => {
        this.toastErrorSerivce.setToastError();
      }, 100);
    }
  }

}
