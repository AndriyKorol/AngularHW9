import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { homeRoutes } from './modules/home-module/home-routing';
import { authRoutes } from './modules/auth/auth-routing';

const routes: Routes = [
    { path: 'login', children: [...authRoutes] },
    // { path: 'signup', component: SignupComponent },
    { path: '', children: [...homeRoutes], canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
    // { path: 'user/:id', children: [...homeRoutes], canActivate: [AuthGuard] },
    // { path: 'add', component: UserEditComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RoutingModule { }
