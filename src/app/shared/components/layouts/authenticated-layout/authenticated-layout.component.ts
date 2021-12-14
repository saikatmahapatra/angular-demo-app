import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavItem } from '../../../utils/ui/model/nav-item';
import { Subscription } from 'rxjs';
import { menu } from '../../../utils/ui/model/menu';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.scss']
})
export class AuthenticatedLayoutComponent implements OnInit {
  ngOnInit() {
  }
}
