import { Injectable } from '@angular/core';
import axios from "axios"

interface Task {
  id: number;
  title: string;
  description: string;
  createdDate: Date;
  dueDate: Date;
  status: 'Completed' | 'Incomplete';

}
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [];
  private apirul = "http://localhost:3000";


  async signup(userdata: { name: string; email: string; password: string, confirmPassword: string }): Promise<any> {
    try {
      const response = await axios.post(`${this.apirul}/user/register`, userdata);
      return response.data.message;

    } catch (error) {
      console.log("error during signup", error);
      throw error;

    }
  }

  async login(userdatar: { email: string, password: string }): Promise<any> {
    try {
      const response = await axios.post(`${this.apirul}/user/login`, userdatar);
      return response.data;

    } catch (error) {
      console.log("eror during login", error);
      throw error;

    }
  }

  // addTask(task: Omit<Task, 'id' | 'createdDate'>) {
  //   this.tasks.push({
  //     id: Date.now(),
  //     createdDate: new Date(),
  //     ...task,
  //   })
  // }

  async addTask(task: { title: string, description: string, dueDate: Date }): Promise<any> {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`${this.apirul}/task/createtask`, task, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.tasks.push(response.data.data);
      return response.data.message; // Backend response will include id and createdDate
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  async getTasks(): Promise<any> {
    // return this.tasks;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${this.apirul}/task/getalltasks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // console.log(response.data)
      this.tasks = response.data.data;

      return this.tasks;


    } catch (error) {
      console.log("Error while fetching the tasks", error);

    }
  }

  async deleteTask(id: number): Promise<any> {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${this.apirul}/task/deletetask/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // this.tasks = this.tasks.filter(task => task.id !== id);
      return response.data.message;

    } catch (error) {
      console.log("Error while deleting the tasks", error);

    }
  }

  async updateTaskStatus(id: number, status: 'Completed' | 'Incomplete'): Promise<any> {

    // const task = this.tasks.find(task => task.id === id);
    // if (task) {
    //   task.status = status;
    // }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${this.apirul}/task/updatetask/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // this.tasks.push(response.data.data);

      return response.data.message;

    } catch (error) {
      console.log("Error while deleting the tasks", error);

    }


  }

  updateTask(id: number, updatedTask: Omit<Task, 'id' | 'createdDate'>) {
    const taskindex = this.tasks.findIndex(task => task.id === id);
    if (taskindex !== -1) {
      this.tasks[taskindex] = {
        id, createdDate: this.tasks[taskindex].createdDate,
        ...updatedTask
      }
    }
  }

  constructor() { }
}
