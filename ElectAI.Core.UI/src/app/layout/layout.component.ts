import { Component, HostListener, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit {
  sidebarOpen = false;
  desktopCollapsed = false;

  ngAfterViewInit() {
    // Safe to access window here
    const width = window.innerWidth;
    this.desktopCollapsed = width <= 1024;
  }

  toggleSidebar() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      this.sidebarOpen = !this.sidebarOpen;
    } else {
      this.desktopCollapsed = !this.desktopCollapsed;
    }
  }

  closeSidebar() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      this.sidebarOpen = false;
    }
  }

  isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  @HostListener('window:resize')
  onResize() {
    const width = window.innerWidth;
    this.desktopCollapsed = width <= 1024;
    
    if (width > 768 && this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }
}