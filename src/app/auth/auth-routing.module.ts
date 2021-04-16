import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
// import { SignoutComponent } from './signout/signout.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: "", component: SigninComponent},
  // {path: 'signout', component: SignupComponent},
  // {path: 'signup', component: SignupComponent},
  // {path: '**', redirectTo: 'signup', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }