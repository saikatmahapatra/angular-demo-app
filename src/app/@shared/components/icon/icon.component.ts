import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    standalone: false
})
export class IconComponent implements OnInit {
  @Input() lib: string = 'material'; // bootstrap | primeng | material
  @Input() name: string = '';
  @Input() width: number = 16;
  @Input() height: number = 16;
  @Input() fill: string = 'currentColor';
  @Input() styleClass: any = '';
  @Input() svg: boolean = false;
  @Input() styleCSS: any = '';

  // Icons
  icons: any = {
    'home': { material: 'home', primeng: 'pi pi-home', bootstrap: 'bi bi-house' },
    'dashboard': { material: 'speed', primeng: 'pi pi-home', bootstrap: 'bi bi-speedometer' },
    'user': { material: 'account_circle', primeng: 'pi pi-user', bootstrap: 'bi bi-person-circle' },
    'users': { material: 'people', primeng: 'pi pi-users', bootstrap: 'bi bi-people' },
    'add': { material: 'add', primeng: 'pi pi-plus', bootstrap: 'bi bi-plus-lg' },
    'edit': { material: 'edit', primeng: 'pi pi-pencil', bootstrap: 'bi bi-pencil' },
    'userEdit': { material: 'edit', primeng: 'pi pi-user-edit', bootstrap: 'bi bi-person-gear' },
    'delete': { material: 'delete', primeng: 'pi pi-trash', bootstrap: 'bi bi-trash' },
    'info': { material: 'info', primeng: 'pi pi-info-circle', bootstrap: 'bi bi-info-circle' },
    'success': { material: 'check_circle', primeng: 'pi pi-check-circle', bootstrap: 'bi bi-check-circle' },
    'error': { material: 'error_outline', primeng: 'pi pi-exclamation-circle', bootstrap: 'bi bi-exclamation-circle' },
    'warning': { material: 'warning_amber', primeng: 'pi pi-exclamation-triangle', bootstrap: 'bi bi-exclamation-triangle' },
    'admin': { material: 'admin_panel_settings', primeng: 'pi pi-lock', bootstrap: 'bi bi-person-lock' },
    'selfService': { material: 'fingerprint', primeng: 'pi pi-folder', bootstrap: 'bi bi-fingerprint' },
    'chevronLeft': { material: 'chevron_left', primeng: 'pi pi-angle-left', bootstrap: 'bi bi-chevron-left' },
    'angleUp': { material: 'expand_less', primeng: 'pi pi-angle-up', bootstrap: 'bi bi-chevron-up' },
    'angleDown': { material: 'expand_more', primeng: 'pi pi-angle-up', bootstrap: 'bi bi-chevron-up' },
    'chevronRight': { material: 'chevron_right', primeng: 'pi pi-angle-right', bootstrap: 'bi bi-chevron-right' },
    'arrowRight': { material: 'arrow_right_alt', primeng: 'pi pi-arrow-right', bootstrap: 'bi bi-arrow-right-short' },
    'currency': { material: 'paid', primeng: 'pi pi-dollar', bootstrap: 'bi bi-currency-dollar' },
    'clock': { material: 'watch_later', primeng: 'pi pi-clock', bootstrap: 'bi bi-clock' },
    'globe': { material: 'language', primeng: 'pi pi-globe', bootstrap: 'bi bi-globe' },
    'map': { material: 'place', primeng: 'pi pi-map-marker', bootstrap: 'bi bi-geo-alt' },
    'phone': { material: 'phone', primeng: 'pi pi-phone', bootstrap: 'bi bi-telephone' },
    'email': { material: 'email', primeng: 'pi pi-envelope', bootstrap: 'bi bi-envelope' },
    'sun': { material: 'light_mode', primeng: 'pi pi-sun', bootstrap: 'bi bi-brightness-high' },
    'moon': { material: 'dark_mode', primeng: 'pi pi-moon', bootstrap: 'bi bi-moon-stars' },
    'circle': { material: 'trip_origin', primeng: 'pi pi-circle-fill', bootstrap: 'bi bi-circle-fill' },
    'signout': { material: 'logout', primeng: 'pi pi-sign-out', bootstrap: 'bi bi-box-arrow-right' },
    'notification': { material: 'notifications', primeng: 'pi pi-bell', bootstrap: 'bi bi-app-indicator' },
    'linechart': { material: 'analytics', primeng: 'pi pi-chart-line', bootstrap: 'bi bi-bar-chart-line' },
    'qualification': { material: 'school', primeng: 'pi pi-book', bootstrap: 'bi bi-mortarboard' },
    'job': { material: 'work_history', primeng: 'pi pi-briefcase', bootstrap: 'bi bi-briefcase' },
    'heart': { material: 'medical_services', primeng: 'pi pi-heart', bootstrap: 'bi bi-heart' },
    'actionRequired': { material: 'help_outline', primeng: 'pi pi-question-circle', bootstrap: 'bi bi-question-circle' },
    'check': { material: 'check_circle', primeng: 'pi pi-check-circle', bootstrap: 'bi bi-check-circle' },
    'cross': { material: 'cancel', primeng: 'pi pi-times-circle', bootstrap: 'bi bi-x-circle' },
    'close': { material: 'close', primeng: 'pi pi-times', bootstrap: 'bi bi-x' },
    'question': { material: 'help_outline', primeng: 'pi pi-question-circle', bootstrap: 'bi bi-question-circle' },
    'send': { material: 'send', primeng: 'pi pi-send', bootstrap: 'bi bi-send-check' },
    'calendar': { material: 'calendar_month', primeng: 'pi pi-calendar', bootstrap: 'bi bi-calendar-check' },
    'tasks': { material: 'task', primeng: 'pi pi-th-large', bootstrap: 'bi bi-columns-gap' },
    'search': { material: 'search', primeng: 'pi pi-search', bootstrap: 'bi bi-search' },
    'settings': { material: 'settings', primeng: 'pi pi-cog', bootstrap: 'bi bi-gear' },
    'upload': { material: 'file_upload', primeng: 'pi pi-upload', bootstrap: 'bi bi-upload' },
    'download': { material: 'file_download', primeng: 'pi pi-download', bootstrap: 'bi bi-download' },
    'exportxls': { material: 'file_download', primeng: 'pi pi-file-excel', bootstrap: 'bi bi-file-earmark-excel' },
    'exportpdf': { material: 'picture_as_pdf', primeng: 'pi pi-file-pdf', bootstrap: 'bi bi-filetype-pdf' },
    'menu': { material: 'menu', primeng: 'pi pi-bars', bootstrap: 'bi bi-list' },
    'comment': { material: 'comment', primeng: 'pi pi-comment', bootstrap: 'bi bi-comment' },
    'verified': { material: 'verified', primeng: 'pi pi-verified', bootstrap: 'bi bi-verified' },
    'projects': { material: 'list_alt', primeng: 'pi pi-info', bootstrap: 'bi bi-info' },
    'calendarclock': { material: 'calendar_clock', primeng: 'pi pi-info', bootstrap: 'bi bi-info' },
    'pendingaction': { material: 'pending_actions', primeng: 'pi pi-info', bootstrap: 'bi bi-info' },
    'username': { material: 'person', primeng: 'pi pi-info', bootstrap: 'bi bi-info' },
    'password': { material: 'password', primeng: 'pi pi-info', bootstrap: 'bi bi-info' },
    'language': { material: 'language', primeng: 'pi pi-globe', bootstrap: 'bi bi-globe' },
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
