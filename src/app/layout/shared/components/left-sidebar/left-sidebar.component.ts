import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent {
  isFullyCollapsed = false;
  activeSection: 'collections' | 'environments' | 'history' | null = 'collections';

  toggleFullCollapse() {
  if (this.isFullyCollapsed) {
    this.isFullyCollapsed = false;
    this.activeSection = 'collections';
  } else {
    this.isFullyCollapsed = true;
    this.activeSection = null;
  }
}

 selectSection(section: 'collections' | 'environments' | 'history') {
  if (this.isFullyCollapsed) {
    this.isFullyCollapsed = false;
  }
  
  if (this.activeSection === section) {
    this.activeSection = null;
    this.isFullyCollapsed = true;
  } else {
    this.activeSection = section;
  }
}
}