import { Component } from '@angular/core';
import { TaskService } from '../../../task.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private taskservice: TaskService, private router: Router) { }

  async onLogin() {
    try {
      const response = await this.taskservice.login({ email: this.email, password: this.password });
      alert(response.message);

      localStorage.setItem('token', response.token);
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/']);

    } catch (error) {
      console.log(error);
    }

  }

}
