import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, AppComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  admin: Admin = new Admin(0,'','',0,'','');
  constructor(private adminService:AdminService , private router: Router) {
    
  }


  login(): void {
    this.adminService.login(this.admin.email, this.admin.password).subscribe(
      next => {
        if (next) {
          this.router.navigateByUrl('/dashboard');
        } else {
          alert('Wrong Details. Please try again.');
        }
      },
      error => {
        console.error('Error logging in:', error);
        alert('Login failed. Please try again.');
      }
    );
  }
}
