import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-request-me',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-me.component.html',
  styleUrl: './request-me.component.scss'
})
export class RequestMeComponent implements OnInit {

  @ViewChild('requestContainer') requestContainer!: ElementRef<HTMLDivElement>;

  responseHeight = 320;
  isResizing = false;
  startY = 0;
  startHeight = 0;
  containerHeight = 0;

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

  ngOnInit() {
    this.parseUrlToParams();
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  addParam() {
    this.queryParams.push({ key: '', value: '', description: '' });
  }

  removeParam(index: number) {
    this.queryParams.splice(index, 1);
    this.updateUrlFromParams();
  }

  onParamChange(index: number) {
    this.updateUrlFromParams();

    if (index === this.queryParams.length - 1) {
      const param = this.queryParams[index];
      if ((param.key || '').trim() || (param.value || '').trim()) {
        this.queryParams.push({ key: '', value: '', description: '' });
      }
    }
  }

  private updateUrlFromParams() {
    let baseUrl = this.url || '';
    let hash = '';

    if (baseUrl.includes('#')) {
      const parts = baseUrl.split('#');
      baseUrl = parts[0];
      hash = '#' + parts.slice(1).join('#');
    }

    const queryIndex = baseUrl.indexOf('?');
    const base = queryIndex !== -1 ? baseUrl.substring(0, queryIndex) : baseUrl;

    const paramParts: string[] = [];

    this.queryParams.forEach(param => {
      const k = (param.key || '').trim();
      const v = (param.value || '').trim();

      if (k === '' && v === '') return;

      if (k !== '' && v === '') {
        paramParts.push(encodeURIComponent(k));
      } else if (k !== '' && v !== '') {
        paramParts.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
      } else if (k === '' && v !== '') {
        paramParts.push('=' + encodeURIComponent(v));
      }
    });

    const queryStr = paramParts.join('&');
    const newUrl = base + (queryStr ? '?' + queryStr : '') + hash;

    if (newUrl !== this.url) {
      this.url = newUrl;
    }
  }

  public parseUrlToParams() {
    const queryIndex = this.url.indexOf('?');
    if (queryIndex === -1) {
      this.queryParams = [{ key: '', value: '', description: '' }];
      return;
    }

    let queryStr = this.url.substring(queryIndex + 1);
    const hashIndex = queryStr.indexOf('#');
    if (hashIndex !== -1) {
      queryStr = queryStr.substring(0, hashIndex);
    }

    if (!queryStr.trim()) {
      this.queryParams = [{ key: '', value: '', description: '' }];
      return;
    }

    const pairs = queryStr.split('&');
    const newParams: { key: string; value: string; description: string }[] = [];

    for (const pair of pairs) {
      if (!pair.trim()) continue;

      const eqIndex = pair.indexOf('=');
      let k: string, v: string;

      if (eqIndex === -1) {
        k = pair;
        v = '';
      } else {
        k = pair.substring(0, eqIndex);
        v = pair.substring(eqIndex + 1);
      }

      const key = k ? decodeURIComponent(k) : '';
      const value = v ? decodeURIComponent(v) : '';

      newParams.push({ key, value, description: '' });
    }

    this.queryParams = newParams;
    this.queryParams.push({ key: '', value: '', description: '' });
  }

  sendRequest() {
    console.log('Enviando request:', this.selectedMethod, this.url);
  }

  startResize(event: MouseEvent) {
    this.isResizing = true;
    this.startY = event.clientY;
    this.startHeight = this.responseHeight;
    this.containerHeight = this.requestContainer.nativeElement.offsetHeight;

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