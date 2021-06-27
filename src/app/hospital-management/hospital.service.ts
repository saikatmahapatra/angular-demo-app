import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  baseURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  createHospital(data) {
    return this.http.post(this.baseURL + '/hospitals', data);
  }

  getAllHospitals() {
    return this.http.get(this.baseURL + '/hospitals');
  }

  updateHospital(hospital) {
    return this.http.put(this.baseURL + '/hospitals/' + hospital.id, hospital);
  }

  deleteHospital(hospital) {
    return this.http.delete(this.baseURL + '/hospitals/' + hospital.id);
  }

  createDept(data) {
    return this.http.post(this.baseURL + '/departments', data);
  }

  getAllDept() {
    return this.http.get(this.baseURL + '/departments/?_expand=hospital');
  }

  getAllDeptOfHosp(id, name) {
    return this.http.get(this.baseURL + '/departments/?_expand=hospital&hospitalId=' + id);
  }

  updateDept(department) {
    return this.http.put(this.baseURL + '/departments/' + department.id, department);
  }

  deleteDept(department) {
    return this.http.delete(this.baseURL + '/departments/' + department.id);
  }

}
