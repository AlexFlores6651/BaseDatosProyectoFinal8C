import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'proyectobase';

  currentUser: any = null;

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  isUser(): boolean {
    return this.currentUser?.role === 'user';
  }




}
