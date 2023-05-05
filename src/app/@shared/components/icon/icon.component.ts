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
  @Input() styleCSS: any = '';

  // Icons
  icons: any = {
    'home': { primeng: 'pi pi-home', bootstrap: 'bi bi-speedometer' },
    'user': { primeng: 'pi pi-user', bootstrap: 'bi bi-person' },
    'users': { primeng: 'pi pi-users', bootstrap: 'bi bi-people' },
    'add': { primeng: 'pi pi-plus', bootstrap: 'bi bi-plus-lg' },
    'edit': { primeng: 'pi pi-pencil', bootstrap: 'bi bi-pencil' },
    'userEdit': { primeng: 'pi pi-user-edit', bootstrap: 'bi bi-person-gear' },
    'delete': { primeng: 'pi pi-trash', bootstrap: 'bi bi-trash' },
    'info': { primeng: 'pi pi-info-circle', bootstrap: 'bi bi-info-circle' },
    'success': { primeng: 'pi pi-check-circle', bootstrap: 'bi bi-check-circle' },
    'error': { primeng: 'pi pi-exclamation-circle', bootstrap: 'bi bi-exclamation-circle' },
    'warning': { primeng: 'pi pi-exclamation-triangle', bootstrap: 'bi bi-exclamation-triangle' },
    'admin': { primeng: 'pi pi-lock', bootstrap: 'bi bi-person-lock' },
    'selfService': { primeng: 'pi pi-folder', bootstrap: 'bi bi-fingerprint' },
    'angleLeft': { primeng: 'pi pi-angle-left', bootstrap: 'bi bi-chevron-left' },
    'angleUp': { primeng: 'pi pi-angle-up', bootstrap: 'bi bi-chevron-up' },
    'angleRight': { primeng: 'pi pi-angle-right', bootstrap: 'bi bi-chevron-right' },
    'arrowRight': { primeng: 'pi pi-arrow-right', bootstrap: 'bi bi-arrow-right-short' },
    'currency': { primeng: 'pi pi-dollar', bootstrap: 'bi bi-currency-dollar' },
    'clock': { primeng: 'pi pi-clock', bootstrap: 'bi bi-clock' },
    'globe': { primeng: 'pi pi-globe', bootstrap: 'bi bi-globe' },
    'map': { primeng: 'pi pi-map-marker', bootstrap: 'bi bi-geo-alt' },
    'phone': { primeng: 'pi pi-phone', bootstrap: 'bi bi-telephone' },
    'email': { primeng: 'pi pi-envelope', bootstrap: 'bi bi-envelope' },
    'sun': { primeng: 'pi pi-sun', bootstrap: 'bi bi-brightness-high' },
    'moon': { primeng: 'pi pi-moon', bootstrap: 'bi bi-moon-stars' },
    'circle': { primeng: 'pi pi-circle-fill', bootstrap: 'bi bi-circle-fill' },
    'signout': { primeng: 'pi pi-sign-out', bootstrap: 'bi bi-box-arrow-right' },
    'notification': { primeng: 'pi pi-bell', bootstrap: 'bi bi-app-indicator' },
    'linechart': { primeng: 'pi pi-chart-line', bootstrap: 'bi bi-bar-chart-line' },
    'book': { primeng: 'pi pi-book', bootstrap: 'bi bi-mortarboard' },
    'job': { primeng: 'pi pi-briefcase', bootstrap: 'bi bi-briefcase' },
    'heart': { primeng: 'pi pi-heart', bootstrap: 'bi bi-heart' },
    'actionRequired': { primeng: 'pi pi-question-circle', bootstrap: 'bi bi-question-circle' },
    'check': { primeng: 'pi pi-check-circle', bootstrap: 'bi bi-check-circle' },
    'cross': { primeng: 'pi pi-times-circle', bootstrap: 'bi bi-x-circle' },
    'question': { primeng: 'pi pi-question-circle', bootstrap: 'bi bi-question-circle' },
    'send': { primeng: 'pi pi-send', bootstrap: 'bi bi-send-check' },
    'timesheet': { primeng: 'pi pi-calendar', bootstrap: 'bi bi-calendar-check' },
    'projects': { primeng: 'pi pi-th-large', bootstrap: 'bi bi-columns-gap' },
    'search': { primeng: 'pi pi-search', bootstrap: 'bi bi-search' },
    'settings': { primeng: 'pi pi-cog', bootstrap: 'bi bi-gear' },
    'upload': { primeng: 'pi pi-upload', bootstrap: 'bi bi-upload' },
    'download': { primeng: 'pi pi-download', bootstrap: 'bi bi-download' },
    'exportxls': { primeng: 'pi pi-file-excel', bootstrap: 'bi bi-file-earmark-excel' },
    'exportpdf': { primeng: 'pi pi-file-pdf', bootstrap: 'bi bi-filetype-pdf' }
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  getIconClass() {
    if (this.lib == 'primeng') {
      return this.icons[this.name]?.primeng ? this.icons[this.name]?.primeng : 'pi pi-question-circle';
    }
    if (this.lib == 'bootstrap') {
      return this.icons[this.name]?.bootstrap ? this.icons[this.name]?.bootstrap : 'bi bi-question-circle';
    }
  }

}
