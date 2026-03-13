import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../core/services/sidebar.service';

interface QueryParam {
  key: string;
  value: string;
  description: string;
}

@Component({
  selector: 'app-request-me',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-me.component.html',
  styleUrl: './request-me.component.scss'
})
export class RequestMeComponent implements OnInit, OnDestroy {

  @ViewChild('requestContainer') requestContainer!: ElementRef;

  private sidebarSub!: Subscription;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    this.sidebarSub = this.sidebarService.onRequestSelected$.subscribe(({ method, url }) => {
      this.selectedMethod = method;
      this.url = url;
      this.parseUrlToParams();
    });
  }

  ngOnDestroy() {
    this.sidebarSub.unsubscribe();
  }

  methods = [
    { value: 'GET', label: 'GET' },
    { value: 'POST', label: 'POST' },
    { value: 'PUT', label: 'PUT' },
    { value: 'PATCH', label: 'PATCH' },
    { value: 'DELETE', label: 'DELETE' },
  ];

  selectedMethod = 'GET';
  url = 'http://localhost:8080/matheus/about';
  tabs = ['Params', 'Authorization', 'Headers', 'Body'];
  activeTab = 'Params';

  queryParams: QueryParam[] = [{ key: '', value: '', description: '' }];

  responseStatus = '';
  responseTime = '';
  responseSize = '';
  responseStored = false;
  responseBody = '';
  isLoading = false;

  responseHeight = 220;
  private resizing = false;
  private startY = 0;
  private startH = 0;

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  addParam() {
    this.queryParams.push({ key: '', value: '', description: '' });
  }

  removeParam(i: number) {
    this.queryParams.splice(i, 1);
    this.rebuildUrl();
  }

  onParamChange() {
    this.rebuildUrl();
  }

  parseUrlToParams() {
    if (!this.url) return;
    try {
      const parsed = new URL(this.url.startsWith('http') ? this.url : 'http://' + this.url);
      const params: QueryParam[] = [];
      parsed.searchParams.forEach((v, k) => {
        params.push({ key: k, value: v, description: '' });
      });
      this.queryParams = params.length > 0
        ? [...params, { key: '', value: '', description: '' }]
        : [{ key: '', value: '', description: '' }];
    } catch {

    }
  }

  rebuildUrl() {
    try {
      const base = this.url.split('?')[0];
      const filled = this.queryParams.filter(p => p.key.trim());
      this.url = filled.length === 0
        ? base
        : `${base}?${filled.map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join('&')}`;
    } catch {

    }
  }

  async sendRequest() {
    if (!this.url.trim()) return;

    this.isLoading = true;
    this.responseStored = false;
    this.responseStatus = '';
    this.responseTime = '';
    this.responseSize = '';

    const start = Date.now();
    const fullUrl = this.url.startsWith('http') ? this.url : 'http://' + this.url;

    try {
      const res = await fetch(fullUrl, { method: this.selectedMethod, headers: { 'Content-Type': 'application/json' } });
      const elapsed = Date.now() - start;
      const text = await res.text();

      let body: string;
      try { body = JSON.stringify(JSON.parse(text), null, 2); }
      catch { body = text; }

      this.responseStatus = `${res.status} ${res.statusText}`;
      this.responseTime = `${elapsed} ms`;
      this.responseSize = `${new Blob([text]).size} B`;
      this.responseBody = body;
      this.responseStored = true;
    } catch (err: any) {
      this.responseStatus = 'Error';
      this.responseTime = `${Date.now() - start} ms`;
      this.responseSize = '—';
      this.responseBody = err?.message ?? 'Request failed';
      this.responseStored = true;
    } finally {
      this.isLoading = false;
    }
  }

  get statusClass(): string {
    const code = parseInt(this.responseStatus, 10);
    if (code >= 200 && code < 300) return 'success';
    if (code >= 400) return 'error';
    return 'pending';
  }

  startResize(e: MouseEvent) {
    this.resizing = true;
    this.startY = e.clientY;
    this.startH = this.responseHeight;
    e.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.resizing) return;
    this.responseHeight = Math.max(100, Math.min(600, this.startH + (this.startY - e.clientY)));
  }

  @HostListener('document:mouseup')
  onMouseUp() { this.resizing = false; }  
}