import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any[]> {
    return this.http.get<any>('api/customers/getCustomers');
  }

  addCustomer(val: any) {
    return this.http.post('api/customers/addCustomer', val);
  }

  updateCustomer(val: any) {
    return this.http.put('api/customers/updateCustomer', val);
  }

  deleteCustomer(val: any) {
    return this.http.post('api/customers/deleteCustomer', val);
  }

}
