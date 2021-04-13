import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() cust: any;

  @Output() closeModal = new EventEmitter<boolean>();

  CustomerID: number = 0;
  Name: string = "";
  Address: string = "";
  City: string = "";
  State: string = "";
  Zip: string = "";

  ngOnInit(): void {
    this.CustomerID = this.cust.CustomerID;
    this.Name = this.cust.Name;
    this.Address = this.cust.Address;
    this.City = this.cust.City;
    this.State = this.cust.State;
    this.Zip = this.cust.Zip;
  }

  addCustomer() {
    var customer = {
      CustomerID: this.CustomerID,
      Name: this.Name,
      Address: this.Address,
      City: this.City,
      State: this.State,
      Zip: this.Zip
    }
    this.service.addCustomer(customer).subscribe(() => {
      this.closeModal.emit();
    });
  }

  updateCustomer() {
    var customer = {
      CustomerID: this.CustomerID,
      Name: this.Name,
      Address: this.Address,
      City: this.City,
      State: this.State,
      Zip: this.Zip
    }
    this.service.updateCustomer(customer).subscribe(() => {
      this.closeModal.emit();
    });
  }

}
