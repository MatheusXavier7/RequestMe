import { Component } from '@angular/core';
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
    { key: '', value: '', description: '' },
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
}