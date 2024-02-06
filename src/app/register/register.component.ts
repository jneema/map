import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email : string = '';
  password : string = '';
  confirmPassword : string = '';
  showPassword: boolean = false; 
  showConfirmPassword: boolean = false;

  constructor(private auth : AuthService) {  }

  register() {
    
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match. Please make sure the passwords match.');
      return;
    }

    this.auth.register(this.email, this.password);

  }


}
