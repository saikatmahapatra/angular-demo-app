import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() lib: string = 'primeng'; // bootstrap | primeng | material
  @Input() name: string = '';
  @Input() width: number = 16;
  @Input() height: number = 16;
  @Input() fill: string = 'currentColor';
  @Input() styleClass: any = '';
  @Input() svg: boolean = false;
  @Input() styleCSS: any = '';

  // Icons
  icons: any = {
    'home': { material: 'info', primeng: 'pi pi-home', bootstrap: 'bi bi-house' },
    'dashboard': { material: 'info', primeng: 'pi pi-home', bootstrap: 'bi bi-speedometer' },
    'user': { material: 'info', primeng: 'pi pi-user', bootstrap: 'bi bi-person-circle' },
    'users': { material: 'info', primeng: 'pi pi-users', bootstrap: 'bi bi-people' },
    'add': { material: 'info', primeng: 'pi pi-plus', bootstrap: 'bi bi-plus-lg' },
    'edit': { material: 'info', primeng: 'pi pi-pencil', bootstrap: 'bi bi-pencil' },
    'userEdit': { material: 'info', primeng: 'pi pi-user-edit', bootstrap: 'bi bi-person-gear' },
    'delete': { material: 'info', primeng: 'pi pi-trash', bootstrap: 'bi bi-trash' },
    'info': { material: 'info', primeng: 'pi pi-info-circle', bootstrap: 'bi bi-info-circle' },
    'success': { material: 'info', primeng: 'pi pi-check-circle', bootstrap: 'bi bi-check-circle' },
    'error': { material: 'info', primeng: 'pi pi-exclamation-circle', bootstrap: 'bi bi-exclamation-circle' },
    'warning': { material: 'info', primeng: 'pi pi-exclamation-triangle', bootstrap: 'bi bi-exclamation-triangle' },
    'admin': { material: 'info', primeng: 'pi pi-lock', bootstrap: 'bi bi-person-lock' },
    'selfService': { material: 'info', primeng: 'pi pi-folder', bootstrap: 'bi bi-fingerprint' },
    'angleLeft': { material: 'info', primeng: 'pi pi-angle-left', bootstrap: 'bi bi-chevron-left' },
    'angleUp': { material: 'info', primeng: 'pi pi-angle-up', bootstrap: 'bi bi-chevron-up' },
    'angleRight': { material: 'info', primeng: 'pi pi-angle-right', bootstrap: 'bi bi-chevron-right' },
    'arrowRight': { material: 'info', primeng: 'pi pi-arrow-right', bootstrap: 'bi bi-arrow-right-short' },
    'currency': { material: 'info', primeng: 'pi pi-dollar', bootstrap: 'bi bi-currency-dollar' },
    'clock': { material: 'info', primeng: 'pi pi-clock', bootstrap: 'bi bi-clock' },
    'globe': { material: 'info', primeng: 'pi pi-globe', bootstrap: 'bi bi-globe' },
    'map': { material: 'info', primeng: 'pi pi-map-marker', bootstrap: 'bi bi-geo-alt' },
    'phone': { material: 'info', primeng: 'pi pi-phone', bootstrap: 'bi bi-telephone' },
    'email': { material: 'info', primeng: 'pi pi-envelope', bootstrap: 'bi bi-envelope' },
    'sun': { material: 'info', primeng: 'pi pi-sun', bootstrap: 'bi bi-brightness-high' },
    'moon': { material: 'info', primeng: 'pi pi-moon', bootstrap: 'bi bi-moon-stars' },
    'circle': { material: 'info', primeng: 'pi pi-circle-fill', bootstrap: 'bi bi-circle-fill' },
    'signout': { material: 'info', primeng: 'pi pi-sign-out', bootstrap: 'bi bi-box-arrow-right' },
    'notification': { material: 'info', primeng: 'pi pi-bell', bootstrap: 'bi bi-app-indicator' },
    'linechart': { material: 'info', primeng: 'pi pi-chart-line', bootstrap: 'bi bi-bar-chart-line' },
    'book': { material: 'info', primeng: 'pi pi-book', bootstrap: 'bi bi-mortarboard' },
    'job': { material: 'info', primeng: 'pi pi-briefcase', bootstrap: 'bi bi-briefcase' },
    'heart': { material: 'info', primeng: 'pi pi-heart', bootstrap: 'bi bi-heart' },
    'actionRequired': { material: 'info', primeng: 'pi pi-question-circle', bootstrap: 'bi bi-question-circle' },
    'check': { material: 'info', primeng: 'pi pi-check-circle', bootstrap: 'bi bi-check-circle' },
    'cross': { material: 'info', primeng: 'pi pi-times-circle', bootstrap: 'bi bi-x-circle' },
    'close': { material: 'info', primeng: 'pi pi-times', bootstrap: 'bi bi-x' },
    'question': { material: 'info', primeng: 'pi pi-question-circle', bootstrap: 'bi bi-question-circle' },
    'send': { material: 'info', primeng: 'pi pi-send', bootstrap: 'bi bi-send-check' },
    'calendar': { material: 'info', primeng: 'pi pi-calendar', bootstrap: 'bi bi-calendar-check' },
    'tasks': { material: 'info', primeng: 'pi pi-th-large', bootstrap: 'bi bi-columns-gap' },
    'search': { material: 'info', primeng: 'pi pi-search', bootstrap: 'bi bi-search' },
    'settings': { material: 'info', primeng: 'pi pi-cog', bootstrap: 'bi bi-gear' },
    'upload': { material: 'info', primeng: 'pi pi-upload', bootstrap: 'bi bi-upload' },
    'download': { material: 'info', primeng: 'pi pi-download', bootstrap: 'bi bi-download' },
    'exportxls': { material: 'info', primeng: 'pi pi-file-excel', bootstrap: 'bi bi-file-earmark-excel' },
    'exportpdf': { material: 'info', primeng: 'pi pi-file-pdf', bootstrap: 'bi bi-filetype-pdf' },
    'menu': { material: 'info', primeng: 'pi pi-bars', bootstrap: 'bi bi-list' },
    'comment': { material: 'info', primeng: 'pi pi-comment', bootstrap: 'bi bi-comment' },
    'comments': { material: 'info', primeng: 'pi pi-comments', bootstrap: 'bi bi-comments' },
    'verified': { material: 'info', primeng: 'pi pi-verified', bootstrap: 'bi bi-verified' }
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  getIconClass() {
    if (this.lib == 'material') {
      return this.icons[this.name]?.material ? this.icons[this.name]?.material : 'info';
    }
    if (this.lib == 'primeng') {
      return this.icons[this.name]?.primeng ? this.icons[this.name]?.primeng : 'pi pi-question-circle';
    }
    if (this.lib == 'bootstrap') {
      return this.icons[this.name]?.bootstrap ? this.icons[this.name]?.bootstrap : 'bi bi-question-circle';
    }
  }

}
