import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showBackToTop = false;
 constructor(){}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const offset = window.pageYOffset;
    const height = window.innerHeight;
    this.showBackToTop = offset > height;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
