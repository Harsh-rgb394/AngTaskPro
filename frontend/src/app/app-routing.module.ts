import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from "./pages/task-view/task-view.component"
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AuthGuard } from './auth.guard';
import { GuestGuard } from './guest.guard';
const routes: Routes = [{

  path: '', component: TaskViewComponent, canActivate: [AuthGuard]
}, {
  path: 'login', component: LoginComponent, canActivate: [GuestGuard]
},
{
  path: "register", component: SignupComponent, canActivate: [GuestGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
