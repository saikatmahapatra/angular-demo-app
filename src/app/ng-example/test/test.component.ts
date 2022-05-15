import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ContentCardComponent } from '../content-card/content-card.component';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./a.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class TestComponent implements OnInit, AfterViewInit {

  @Input()
  showShubhead: boolean = false;
  routeData: any;
  msg = '';

  @ViewChild(ContentCardComponent)
  private contentCC !: ContentCardComponent;

  @ViewChildren(ContentCardComponent)
  private childrenContentCard!: QueryList<ContentCardComponent>;

  constructor(private route: ActivatedRoute, private cd : ChangeDetectorRef) { 

  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      console.log('====>ActivatedRoute=====>', data);
    })
    this.msg = 'ngOnInit called from test.component.ts';
  }

  ngAfterViewInit() {
    console.log('ViewChild of ContentCardComponent ', this.contentCC);
    console.log('View Children of ContentCardComponent', this.childrenContentCard);

    //ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'ngOnInit called from test.component.ts
    //this.contentCC.message = 'I am a JS developer';
    // This can be fixed by 2 way
    // 1. Chnage this message in ngAfterContentInit
    // 2. manually call chnageDetectoreRef
    this.cd.detectChanges();
  }
  

}
