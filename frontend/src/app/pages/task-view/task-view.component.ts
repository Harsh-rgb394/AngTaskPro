import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-view',
  standalone: false,

  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent {
  tasks: any[] = []; // Define tasks property
  filteredTasks: any[] = []; // Filtered tasks to display
  selectedTask: any = null;

  // filters 
  statusFilter: string = 'all'; // "all", "completed", "incomplete"
  dueDateFilter: string = '';

  // wihout this constructor you wont able to get or use the external depencdy or fuctinlaoty like TaskService 
  // and uses by differtn name tasksercie and uses throguhtoiut the compoent 
  constructor(private taskService: TaskService, private router: Router) {
    // this.tasks = this.taskService.getTasks(); // Initialize tasks after taskService is initialized
  }

  // this is like useeffect of angular jo compoent render or mount par call hota hai 
  async ngOnInit() {
    const res = await this.taskService.getTasks(); // Fetch tasks from the service
    // console.log(res);
    // if (res) {
    //   alert("data fetched");

    // }
    this.tasks = res;
    this.filteredTasks = [...this.tasks];
  }

  async updateStatus(id: number, status: 'Incomplete' | 'Completed') {
    await this.taskService.updateTaskStatus(id, status);
    alert("updated task");
    this.tasks = await this.taskService.getTasks(); // Refresh tasks
    this.applyFilters();
  }

  async deleteTask(id: number) {
    const res = await this.taskService.deleteTask(id);
    alert(res);
    this.tasks = await this.taskService.getTasks(); // Refresh tasks
    this.applyFilters();
  }

  applyFilters() {
    // Start with all tasks
    this.filteredTasks = [...this.tasks];

    // Filter by status
    if (this.statusFilter !== 'all') {
      const isCompleted = this.statusFilter === 'Completed';
      this.filteredTasks = this.filteredTasks.filter(
        task => task.status === (isCompleted ? 'Completed' : 'Incomplete')
      );
    }

    // Filter by due date
    if (this.dueDateFilter) {
      const filterDate = new Date(this.dueDateFilter);
      this.filteredTasks = this.filteredTasks.filter(task => {
        const taskDueDate = new Date(task.dueDate);
        return taskDueDate.toISOString().split('T')[0] === filterDate.toISOString().split('T')[0];
      });
    }
  }
  handleLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }
  // onUpdate(task:Task){
  //   this.router.
  // }

}