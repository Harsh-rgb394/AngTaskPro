import { Component } from '@angular/core';
import { TaskService } from '../../task.service';


@Component({
  selector: 'app-task-create',
  standalone: false,

  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})

export class TaskCreateComponent {
  title: string = '';
  description: string = '';
  dueDate!: string;

  constructor(private taskService: TaskService) { }

  async createTask() {
    try {
      if (this.title && this.description && this.dueDate) {
        const result = this.taskService.addTask({
          title: this.title,
          description: this.description,
          dueDate: new Date(this.dueDate), // Convert string to Date object

        });
        alert("success created");
        this.title = '';
        this.description = '';
        this.dueDate = '';
      }

    } catch (error) {
      console.log("Failed to add task: ", error);

    }
  }




}
