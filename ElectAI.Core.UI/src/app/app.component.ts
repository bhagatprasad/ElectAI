import { Component, Inject, PLATFORM_ID, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header.component';
import { SidebarComponent } from './layout/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ElectAI';
  sidebarOpen = false;
  sidebarCollapsed = false;
  isMobileView = false; // Store as property, not computed
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser && typeof window !== 'undefined') {
      this.updateScreenState();
    }
  }

  private updateScreenState() {
    if (!this.isBrowser || typeof window === 'undefined') return;
    
    const width = window.innerWidth;
    this.isMobileView = width <= 768;
    this.sidebarCollapsed = width <= 1024;
  }

  toggleSidebar() {
    if (this.isMobileView) {
      this.sidebarOpen = !this.sidebarOpen;
    } else {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }

  closeSidebar() {
    if (this.isMobileView) {
      this.sidebarOpen = false;
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.isBrowser) return;
    
    this.updateScreenState();
    
    // Close mobile sidebar when resizing to desktop
    if (!this.isMobileView && this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }
}