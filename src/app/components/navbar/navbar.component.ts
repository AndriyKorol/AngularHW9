// @ts-ignore
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  brand = 'PostsApp';
  isAuth: boolean;

  constructor(
    public auth: AuthService,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.auth.userAuthEvent.subscribe((res: boolean) => {
      this.isAuth = res;
    });
  }

  onLogout() {
    this.spinner.show();
    this.auth.logout();
    this.toastr.info('Logged out successfully', 'Info');
    this.spinner.hide();
  }

}
