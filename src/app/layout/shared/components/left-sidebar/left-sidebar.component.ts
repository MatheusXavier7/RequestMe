import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarService } from '../../../../core/services/sidebar.service';

export interface RequestItem {
  name: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  url: string;
}

export interface Collection {
  id: string;
  name: string;
  expanded: boolean;
  requests: RequestItem[];
}

export interface HistoryEntry {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  url: string;
  timestamp: Date;
}

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent {

  constructor(private sidebarService: SidebarService) {}

  isFullyCollapsed = false;
  activeSection: 'collections' | 'history' | null = 'collections';
  collectionSearch = '';

  collections: Collection[] = [
    {
      id: 'portfolio',
      name: 'Xavier — Portfolio',
      expanded: true,
      requests: [
        { name: 'About me', method: 'get', url: 'http://localhost:8080/matheus/about'    },
        { name: 'Skills',   method: 'get', url: 'http://localhost:8080/matheus/skills'   },
        { name: 'Projects', method: 'get', url: 'http://localhost:8080/matheus/projects' },
        { name: 'Contact',  method: 'get', url: 'http://localhost:8080/matheus/contact'  },
      ]
    }
  ];

  history: HistoryEntry[] = [
    { method: 'get',  url: 'localhost:8080/matheus/about',    timestamp: new Date() },
    { method: 'get',  url: 'localhost:8080/matheus/projects', timestamp: new Date() },
    { method: 'post', url: 'localhost:8080/matheus/contact',  timestamp: new Date(Date.now() - 86400000) },
  ];

  get todayHistory(): HistoryEntry[] {
    const today = new Date();
    return this.history.filter(h => h.timestamp.toDateString() === today.toDateString());
  }

  get olderHistory(): HistoryEntry[] {
    const today = new Date();
    return this.history.filter(h => h.timestamp.toDateString() !== today.toDateString());
  }

  get filteredCollections(): Collection[] {
    if (!this.collectionSearch.trim()) return this.collections;
    const q = this.collectionSearch.toLowerCase();
    return this.collections
      .map(c => ({
        ...c,
        expanded: true,
        requests: c.requests.filter(r =>
          r.name.toLowerCase().includes(q) || r.url.toLowerCase().includes(q)
        )
      }))
      .filter(c => c.name.toLowerCase().includes(q) || c.requests.length > 0);
  }

  toggleFullCollapse() {
    if (this.isFullyCollapsed) {
      this.isFullyCollapsed = false;
      if (!this.activeSection) this.activeSection = 'collections';
    } else {
      this.isFullyCollapsed = true;
    }
  }

  selectSection(section: 'collections' | 'history') {
    if (this.isFullyCollapsed) {
      this.isFullyCollapsed = false;
      this.activeSection = section;
      return;
    }
    if (this.activeSection === section) {
      this.isFullyCollapsed = true;
      this.activeSection = null;
    } else {
      this.activeSection = section;
    }
  }

  toggleCollection(col: Collection) {
    col.expanded = !col.expanded;
  }

  selectRequest(req: RequestItem) {
    this.sidebarService.selectRequest(req.method, req.url);
  }

  selectHistoryItem(item: HistoryEntry) {
    this.sidebarService.selectRequest(item.method, item.url);
  }

  clearHistory() {
    this.history = [];
  }

  addToHistory(method: string, url: string) {
    this.history.unshift({
      method: method.toLowerCase() as HistoryEntry['method'],
      url,
      timestamp: new Date()
    });
    if (this.history.length > 50) this.history.pop();
  }
}