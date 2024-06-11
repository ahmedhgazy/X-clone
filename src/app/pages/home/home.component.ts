import { Component, OnInit } from '@angular/core';
import { LeftSidebarComponent } from '../../shared/sidebar/sidebar.component';
import { RightSidebarComponent } from '../../shared/right-sidebar/right-sidebar.component';

@Component({
  standalone: true,
  imports: [LeftSidebarComponent, RightSidebarComponent],
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
