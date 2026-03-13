import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface SelectedRequest {
  method: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private requestSelected$ = new Subject<SelectedRequest>();
  onRequestSelected$ = this.requestSelected$.asObservable();
  selectRequest(method: string, url: string): void {
    this.requestSelected$.next({ method: method.toUpperCase(), url });
  }
}