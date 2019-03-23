import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly BASE_URL = 'http://localhost:8080/';

  constructor(
    private http: HttpClient
  ) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.BASE_URL}findAll`);
  }

  delete(customer: Customer): Observable<string> {
    return this.http.delete(`${this.BASE_URL}${customer._id}`, {responseType: 'text'});
  }

  save(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.BASE_URL}`, customer);
  }
}
