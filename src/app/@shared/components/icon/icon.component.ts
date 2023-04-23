import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() lib: string = 'primeng'; // bootstrap | primeng
  @Input() name: string = '';
  @Input() width: number = 16;
  @Input() height: number = 16;
  @Input() fill: string = 'currentColor';
  @Input() styleClass: any = '';
  @Input() svg: boolean = false;

  // Icons
  icons: any = {
    'home': { primeng: 'pi pi-home', bootstrap: '' },
    'user': { primeng: 'pi pi-user', bootstrap: '' },
    'users': { primeng: 'pi pi-users', bootstrap: '' },
    'add': { primeng: 'pi pi-plus', bootstrap: '' },
    'edit': { primeng: 'pi pi-pencil', bootstrap: '' },
    'userEdit': { primeng: 'pi pi-user-edit', bootstrap: '' },
    'delete': { primeng: 'pi pi-trash', bootstrap: '' },
    'info': { primeng: 'pi pi-info-circle', bootstrap: '' },
    'success': { primeng: 'pi pi-check-circle', bootstrap: '' },
    'error': { primeng: 'pi pi-exclamation-circle', bootstrap: '' },
    'warning': { primeng: 'pi pi-exclamation-triangle', bootstrap: '' },
    'admin': { primeng: 'pi pi-lock', bootstrap: '' },
    'selfService': { primeng: 'pi pi-folder', bootstrap: '' },
    'angleLeft': { primeng: 'pi pi-angle-left', bootstrap: '' },
    'angleUp': { primeng: 'pi pi-angle-up', bootstrap: '' },
    'angleRight': { primeng: 'pi pi-angle-right', bootstrap: '' },
    'arrowRight': { primeng: 'pi pi-arrow-right', bootstrap: '' },
    'currency': { primeng: 'pi pi-dollar', bootstrap: '' },
    'clock': { primeng: 'pi pi-clock', bootstrap: '' },
    'globe': { primeng: 'pi pi-globe', bootstrap: '' },
    'map': { primeng: 'pi pi-map-marker', bootstrap: '' },
    'phone': { primeng: 'pi pi-phone', bootstrap: '' },
    'email': { primeng: 'pi pi-envelope', bootstrap: '' },
    'sun': { primeng: 'pi pi-sun', bootstrap: '' },
    'moon': { primeng: 'pi pi-moon', bootstrap: '' },
    'circle': { primeng: 'pi pi-circle-fill', bootstrap: '' },
    'signout': { primeng: 'pi pi-sign-out', bootstrap: '' },
    'notification': { primeng: 'pi pi-bell', bootstrap: '' },
    'linechart': { primeng: 'pi pi-chart-line', bootstrap: '' },
    'book': { primeng: 'pi pi-book', bootstrap: '' },
    'job': { primeng: 'pi pi-briefcase', bootstrap: '' },
    'heart': { primeng: 'pi pi-heart', bootstrap: '' },
    'actionRequired': { primeng: 'pi pi-question-circle', bootstrap: '' },
    'check': { primeng: 'pi pi-check-circle', bootstrap: '' },
    'cross': { primeng: 'pi pi-times-circle', bootstrap: '' },
    'question': { primeng: 'pi pi-question-circle', bootstrap: '' },
    'send': { primeng: 'pi pi-send', bootstrap: '' },
    'timesheet': { primeng: 'pi pi-calendar', bootstrap: '' },
    'projects': { primeng: 'pi pi-th-large', bootstrap: '' },
    'search': { primeng: 'pi pi-search', bootstrap: '' },
    'settings': { primeng: 'pi pi-cog', bootstrap: '' },
    'upload': { primeng: 'pi pi-upload', bootstrap: '' }
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  getIconClass() {
    if (this.lib == 'primeng') {
      return this.icons[this.name]?.primeng ? this.icons[this.name]?.primeng : 'pi pi-question';
    }
    if (this.lib == 'bootstrap') {
      return this.icons[this.name]?.bootstrap ? this.icons[this.name]?.bootstrap : 'bi bi-info-circle';
    }
  }

}
