import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoaderService } from 'src/app/@core/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loading = false;
  constructor(private loader: LoaderService) { }

  ngOnInit(): void {
    this.loader.getLoader()
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((val: any) => {
        this.loading = val;
      });
  }

}
