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
  @Input() styleCSS: any = '';
  @Input() svg: boolean = false;

  // Icons
  icons: any = {
    'home': { primeng: 'pi pi-home', bootstrap: '' },
    'user': { primeng: 'pi pi-user', bootstrap: '' },
    'users': { primeng: 'pi pi-users', bootstrap: '' },
    'plus': { primeng: 'pi pi-plus', bootstrap: '' },
    'edit': { primeng: 'pi pi-pencil', bootstrap: '' },
    'userEdit': { primeng: 'pi pi-user-edit', bootstrap: '' },
    'delete': { primeng: 'pi pi-trash', bootstrap: '' },
    'info': { primeng: 'pi pi-info', bootstrap: '' },
    'infoCircle': { primeng: 'pi pi-info-circle', bootstrap: '' },
    'admin': { primeng: 'pi pi-lock', bootstrap: '' },
    'selfService': { primeng: 'pi pi-folder', bootstrap: '' },
    'angleLeft': { primeng: 'pi pi-angle-left', bootstrap: '' },
    'currency': { primeng: 'pi pi-dollart', bootstrap: '' },
    'clock': { primeng: 'pi pi-clock', bootstrap: '' },
    'globe': { primeng: 'pi pi-globe', bootstrap: '' },
    'location': { primeng: 'pi pi-map-marker', bootstrap: '' },
    'phone': { primeng: 'pi pi-phone', bootstrap: '' },
    'email': { primeng: 'pi pi-envelope', bootstrap: '' },
    'sun': { primeng: 'pi pi-sun', bootstrap: '' },
    'moon': { primeng: 'pi pi-moon', bootstrap: '' },
    'status': { primeng: 'pi pi-circle-fill', bootstrap: '' },
    
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
