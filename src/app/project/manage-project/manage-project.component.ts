import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.scss']
})
export class ManageProjectComponent implements OnInit {
  dataRow: any;
  totalRecords: any;

  constructor(public apiSvc: ApiService) { }

  ngOnInit(): void {
    this.getProjects();
  }
  
  getProjects() {
    this.apiSvc.get(AppConfig.apiUrl.getProject).subscribe((response: any) => {
      this.totalRecords = response?.data['num_rows'];
      this.dataRow = response?.data['data_rows'];
    });
  }

  delete(id: number) {
    console.log(id);
  }

}
