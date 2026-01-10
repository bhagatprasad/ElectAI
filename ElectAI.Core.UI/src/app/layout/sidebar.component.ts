import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() open = false;        // mobile open state
  @Input() collapsed = false;   // desktop collapse state
  
  @Output() closeSidebar = new EventEmitter<void>();
  
  close() {
    this.closeSidebar.emit();
  }
}