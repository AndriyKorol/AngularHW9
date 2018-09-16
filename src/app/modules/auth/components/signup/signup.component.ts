import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.auth.userAuthEvent.subscribe((res: boolean) => {
      if (res) this.router.navigate(['/']);
    });

    this.signUpForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(6)]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.spinner.show();
    this.auth.signup(this.signUpForm.value.name, this.signUpForm.value.email, this.signUpForm.value.password).subscribe((res: boolean) => {
      if (res) this.router.navigate(['/']);
      this.toastr.success('Sign up is completed', 'Success!');
      this.spinner.hide();
    }, ({error, status}) => {
      this.toastr.error(`${error}`, `Error ${status}!`);
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }

}
