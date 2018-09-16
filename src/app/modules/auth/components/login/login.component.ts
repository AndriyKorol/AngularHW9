import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
    if (this.auth.isAuth) this.route.navigate(['/']);
    // Init Form
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.required])
    })
  }

  onSubmit() {
    if(this.loginForm.invalid) return;
    this.spinner.show();
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((res:boolean) => {
      if(res) this.route.navigate(['/']);
      this.toastr.success('You is logged now', 'Success!');
      this.spinner.hide();
    }, ({error, status}) => {
      this.toastr.error(`${error}`, `Error ${status}!`);
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }

  onBlur(name: string) {
    if(this.loginForm.get(name).invalid) {
      this.toastr.success('You is logged now', 'Success!');
    }
  }
}
