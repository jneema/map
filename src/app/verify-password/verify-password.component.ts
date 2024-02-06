import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.css']
})
export class VerifyPasswordComponent {
  email: string = '';

  constructor (private auth : AuthService) { }

  resetPassword() {
    this.auth.forgotPassword(this.email)

  }
}
