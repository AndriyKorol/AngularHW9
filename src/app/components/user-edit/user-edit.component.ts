import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userId: string;
  user: User;
  users: User[];
  isReadOnly = true;


  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public userService: UsersService,
    public actvatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.spinner.show();
    // Get user Id
    this.userId = this.actvatedRoute.snapshot.params['id'];
    // Get user data
    this.userService.getUser(this.userId).subscribe((response: User) => {
      this.user = response;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      console.log(err);
      // show error message
    });
  }

  onSave() {
    this.spinner.show();
    const updtUser = Object.assign([], this.user);
    // Update user
    this.userService.updateUser(updtUser).subscribe((response: User) => {
      this.spinner.hide();
      this.toastr.success( 'Data is edited successfully');
      this.router.navigate(['/']);
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.toastr.error(err.message);
    });
  }

  onAdd() {
    this.spinner.show();
    const newUser: User = {
      id: this.user.id,
      name: this.user.name,
      username: this.user.username,
      email: this.user.email,
      address: this.user.address,
      phone: this.user.phone,
      company: this.user.company,
      website: this.user.website
    };
    this.userService.addUser(newUser).subscribe((someUser: User) => {
      this.users.unshift(someUser);
      this.spinner.hide();
      this.toastr.success( 'User is added successfully');
      this.router.navigate(['/']);
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.toastr.error(err.message);
    });
  }
}
