import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent {
  email : string = '';
  password : string = '';
  showPassword: boolean = false; // Add this line to declare showPassword variable

  constructor(private auth : AuthService) {  }

  login() {
    this.auth.login(this.email, this.password);
  }

  signInWithGoogle(){
    this.auth.googleSignIn()
  }

  
}
