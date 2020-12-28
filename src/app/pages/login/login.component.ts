import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private authenticateService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  login(): void {
   console.log(this.loginForm.getRawValue());
    if (this.loginForm.valid) {
      const email = this.loginForm.getRawValue().email;
      const password = this.loginForm.getRawValue().password;
      this.authenticateService.login(email, password).subscribe(res => {
        this.router.navigate(['']);
      }, error => {
        console.log(error);
      });
    }
  }
}
