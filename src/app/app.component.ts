import { Component, TemplateRef } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { Customer } from './models/customer';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  customers: Customer[] = [];
  modalRef: BsModalRef;

  customerToBeModified = {} as Customer;

  constructor (
    private customerService: CustomerService,
    private modalService: BsModalService
  ) {
     customerService.getAllCustomers().subscribe(list => {
      this.customers = list;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addNew(template: TemplateRef<any>) {
    this.customerToBeModified = {} as Customer;
    this.openModal(template);
  }

  modify(customer: Customer, template: TemplateRef<any>) {
    this.customerToBeModified = JSON.parse(JSON.stringify(customer));
    this.openModal(template);
  }

  delete(customer: Customer) {
    this.customerService.delete(customer).subscribe(res => {
      if (res === 'Deleted') {
        this.customers.splice(this.customers.indexOf(customer), 1);
      }
    });
  }

  save(template: TemplateRef<any>) {
    this.customerService.save(this.customerToBeModified).subscribe(customer => {
      for (const c of this.customers) {
        if (c._id === customer._id) {
          this.customers.splice(this.customers.indexOf(c), 1, customer);
          this.modalRef.hide();
          return;
        }
      }
      this.customers.push(customer);
      this.modalRef.hide();
    });
  }
}
