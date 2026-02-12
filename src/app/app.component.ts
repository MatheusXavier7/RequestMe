import { Component } from '@angular/core';
import { RequestMeComponent } from './layout/request-me/request-me.component';
import { PostmanTopBarComponent } from './layout/shared/components/postman-top-bar/postman-top-bar.component';
import { LeftSidebarComponent } from './layout/shared/components/left-sidebar/left-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RequestMeComponent,
    PostmanTopBarComponent,
    LeftSidebarComponent
  ], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'request-me';
}