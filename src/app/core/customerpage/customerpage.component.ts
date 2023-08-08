import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-customerpage',
  templateUrl: './customerpage.component.html',
  styleUrls: ['./customerpage.component.scss']
})
export class CustomerpageComponent {
  idPermission: any;
  isCustomer!: boolean;
  role_id: any;
  customerForm !: FormGroup;
  customer: any;
  isChecked: boolean = true;
  isData: boolean = true;
  isStatusUpdate: boolean = true;
  mainCustomer: any;
  searchText:any;
  constructor(private permission: SettingsService, private customerapi: CustomerService, private fb: FormBuilder,private toast: NgToastService,) { }
  ngOnInit(): void {
    this.role_id = localStorage.getItem('token')
    this.userPermissionGet(this.role_id);
    this.customerGet();
    this.customerForm = this.fb.group({
      customerId: new FormControl(''),
      customer_name: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      pincode: new FormControl(''),
      country: new FormControl(''),
      Mobilenumber: new FormControl(''),
      billing_address: new FormControl(''),
      account_type: new FormControl(),
      opening_balance: new FormControl(''),
      credit_allowed: new FormControl(),
      credit_limit: new FormControl(''),
      pan_no: new FormControl(''),
      Gstin: new FormControl(''),
      isactive: new FormControl(false)
    })
  }
  StatusUpdate(value: any) {
    let dd = !value.isactive;
    console.log('st', dd)
    
    let statusdata = {
      customerId: value.customerId,
      customer_name: value.customer_name,
      city: value.city,
      state: value.state,
      pincode: value.pincode,
      country: value.country,
      Mobilenumber: value.Mobilenumber,
      billing_address: value.billing_address,
      account_type: value.account_type,
      opening_balance: value.opening_balance,
      credit_allowed: value.credit_allowed,
      credit_limit: value.credit_limit,
      pan_no: value.pan_no,
      Gstin: value.Gstin,
      isactive: dd
    }
    this.customerapi.updateStatusCustomer(statusdata).subscribe((res: any) => {
      console.log('statusUpdate', res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.customerGet();
    })
  }
  patchCustomer(value:any){
    console.log('value',value)
    this.customerForm.patchValue({
      customerId: value.customerId,
      customer_name: value.customer_name,
      city: value.city,
      state: value.state,
      pincode: value.pincode,
      country: value.country,
      Mobilenumber: value.Mobilenumber,
      billing_address: value.billing_address,
      account_type: value.account_type,
      opening_balance: value.opening_balance,
      credit_allowed: value.credit_allowed,
      credit_limit: value.credit_limit,
      pan_no: value.pan_no,
      Gstin: value.Gstin,
      isactive: value.isactive
    })
  }
  filtredIsActive() {
    this.isChecked = !this.isChecked;
    console.log('cc', this.isChecked)
    this.customer = this.mainCustomer;
    let filData = this.customer.filter((isFil: any) => {
      if (isFil.isactive === this.isChecked) {
        return isFil
      }
    })
    this.customer = filData;
    if (this.customer.length < 1 || this.customer == undefined || this.customer == null) {
      this.isData = false;
    }
    else {
      this.isData = true;
    }
    console.log(this.customer)
  }
  customerGet() {
    this.customerapi.getCustomer().subscribe((res: any) => {
      console.log('customer', res);
      this.mainCustomer = res;
      this.isChecked = true;
      this.customer = res.filter((fil: any) => {
        if (fil.isactive) {
          return fil
        }
      })
      if (this.customer.length < 1 || this.customer == undefined || this.customer == null) {
        this.isData = false;
      }
    })
  }
  userPermissionGet(id: any) {
    this.permission.getUserPermission(id).subscribe((res: any) => {
      if (res.length < 1) {
        console.log(res)

      }
      console.log('permissionGetByIs', res);
      this.idPermission = res;
      console.log(this.idPermission[0].category)
      this.isCustomer = this.idPermission[0].customer;
    })
  }


  customerPost() {
    console.log(this.customerForm.value);
    this.customerapi.postCustomer(this.customerForm.value).subscribe((res:any)=>{
      console.log(res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.customerForm.reset();
      this.customerGet();

    })
  }



  // resetForm() {

  // }





}
