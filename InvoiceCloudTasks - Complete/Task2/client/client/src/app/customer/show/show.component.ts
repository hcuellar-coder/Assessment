import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  @ViewChild('closeButton')
  closeButton!: ElementRef;

  constructor(private service: SharedService) { }

  CustomerList: any = [];

  ModalTitle: string = "";
  ActivateAddEdit: boolean = false;
  cust: any;

  ngOnInit(): void {
    this.refreshCustomerList();
  }

  addClick() {
    this.cust = {
      CustomerID: 0,
      Name: "",
      Address: "",
      City: "",
      State: "",
      Zip: ""
    }

    this.ModalTitle = "Add Customer";
    this.ActivateAddEdit = true;
  }

  childCloseModal() {
    this.closeButton.nativeElement.click();
  }

  editClick(customer: any) {
    this.cust = customer;
    this.ModalTitle = "Edit Customer";
    this.ActivateAddEdit = true;
  }

  deletePrep(customer: any) {
    this.cust = {
      CustomerID: customer.CustomerID,
      Name: "",
      Address: "",
      City: "",
      State: "",
      Zip: ""
    }
  }

  deleteClick(customer: any) {
    var data = {
      CustomerID: customer.CustomerID,
    }

    this.service.deleteCustomer(data).subscribe(() => {
      this.refreshCustomerList();
    })
  }

  closeClick() {
    this.ActivateAddEdit = false;
    this.refreshCustomerList();
  }

  refreshCustomerList() {
    this.service.getCustomers().subscribe(data => {
      this.CustomerList = data;
    })
  }

}
