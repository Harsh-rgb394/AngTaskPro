import { Component } from '@angular/core';
import { TaskService } from '../../../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private taskservice: TaskService, private router: Router) { }


  async onSignup() {
    try {

      const response = await this.taskservice.signup({ name: this.name, email: this.email, password: this.password, confirmPassword: this.confirmPassword });
      alert(response);
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

}
