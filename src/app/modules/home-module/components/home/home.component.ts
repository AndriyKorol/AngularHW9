import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { User } from '../../../../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  users: User[];

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public userService: UsersService
  ) { }

  ngOnInit() {
    // Get users
    this.spinner.show();
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log(error);
      this.toastr.error(error.message);
    });
  }

  onDelete(id: any) {
    this.spinner.show();
    this.userService.deleteUser(id).subscribe((data: Object) => {
      this.users = this.users.filter( user => user.id != id);
      this.spinner.hide();
      this.toastr.success( 'User is deleted successfully');
    }, error => {
      this.toastr.error(error.message);
    });
  }
}
