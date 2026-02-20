import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-request-me',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-me.component.html',
  styleUrl: './request-me.component.scss'
})
export class RequestMeComponent {

  responseHeight = 320;
  isResizing = false;
  startY = 0;
  startHeight = 0;

  methods = [
    { value: 'GET', label: 'GET' },
    { value: 'POST', label: 'POST' },
    { value: 'PUT', label: 'PUT' },
    { value: 'DELETE', label: 'DELETE' },
    { value: 'PATCH', label: 'PATCH' }
  ];

  selectedMethod = 'GET';

  url = 'http://localhost:8080/matheus/about';

  tabs = ['Params', 'Authorization', 'Headers (7)', 'Body', 'Scripts', 'Settings'];

  activeTab = 'Params';

  responseStatus = '200 OK';
  responseTime = '13.40 s';
  responseSize = '464 B';
  responseStored = false;

  queryParams = [
    { key: '', value: '', description: '' }
  ];

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  addParam() {
    this.queryParams.push({ key: '', value: '', description: '' });
  }

  sendRequest() {
    console.log('Simulando send:', this.selectedMethod, this.url);
  }

  
  startResize(event: MouseEvent) {
    this.isResizing = true;
    this.startY = event.clientY;
    this.startHeight = this.responseHeight;

    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;

    const delta = event.clientY - this.startY;
    let newHeight = this.startHeight - delta;

    newHeight = Math.max(100, newHeight);
    newHeight = Math.min(800, newHeight);

    this.responseHeight = newHeight;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isResizing = false;
  }
}