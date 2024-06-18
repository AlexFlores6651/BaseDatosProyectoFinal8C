import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  private users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'alex', password: '12345', role: 'user' },
    { username: 'andy', password: '12345', role: 'user' },
    { username: 'ivan', password: '12345', role: 'user' },
    { username: 'armando', password: '12345', role: 'user' },
    { username: 'root1', password: '12345', role: 'admin' },
    { username: 'jefe', password: '12345', role: 'admin' }
  ];

  constructor(private router: Router) {}

  login() {
    const user = this.users.find(user => user.username === this.username && user.password === this.password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Credenciales incorrectas.';
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/sesion']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUserRole(): string {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser).role : '';
  }

}
