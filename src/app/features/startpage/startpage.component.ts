import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastErrorComponent } from '../../shared/toast-error/toast-error.component';

@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastErrorComponent],
  templateUrl: './startpage.component.html',
  styleUrl: './startpage.component.scss'
})
export class StartpageComponent {

  signUpEmail: string = '';

  async onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      // tbd.
      console.log('signUpEmail:', this.signUpEmail);
      ngForm.resetForm();
    } else {
      console.log('Fehler!!!');
      
    }
  }

}
