import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from '../event-utils';
import { ApiService } from 'src/app/@core/services/api.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { CustomAppConfig } from 'src/app/@utils/const/custom-app.config';


@Component({
    selector: 'app-event-calendar',
    templateUrl: './event-calendar.component.html',
    styleUrls: ['./event-calendar.component.scss'],
    standalone: false
})
export class EventCalendarComponent implements OnInit {

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    events: this.getEvents.bind(this),
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true
  };
  currentEvents: EventApi[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private apiSvc: ApiService
    ) {
  }

  ngOnInit() {
    
  }


  getEvents() {
    let queryParams = new HttpParams();
    let headers = new HttpHeaders();
    let options = { headers: headers, params: queryParams };
    this.apiSvc.get(CustomAppConfig.apiUrl.getEvents, options).subscribe((response: any) => {
      
    });
  }
  

}
