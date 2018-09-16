import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {RouterModule} from '@angular/router';
import {UserEditComponent} from './components/user-edit/user-edit.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HomeComponent,
    UserEditComponent
  ],
  providers: [],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
