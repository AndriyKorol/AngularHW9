import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

export const homeRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/:id', component: UserEditComponent }
];
