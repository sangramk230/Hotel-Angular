import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Restaurant';
  isView = false;  
  id = '';
  showBackToTop = false;

  constructor() {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const offset = window.pageYOffset;
    const height = window.innerHeight;
    this.showBackToTop = offset > height;
  }

  goBack(): void {
    this.isView = false;
  }

  clickView(): void {
    this.id = 'id';
    this.isView = true;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
