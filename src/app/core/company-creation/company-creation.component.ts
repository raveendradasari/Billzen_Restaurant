import { Component, OnInit } from '@angular/core';

import { SettingsService } from 'src/app/shared/services/settings.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CompanyService } from 'src/app/shared/services/company.service';

@Component({
  selector: 'app-company-creation',
  templateUrl: './company-creation.component.html',
  styleUrls: ['./company-creation.component.scss']
})
export class CompanyCreationComponent {


  idPermission: any;
  isSection!: boolean;
  role_id: any;
  company: any;
  companyform!: FormGroup;
  isUpdate: boolean = false;
  transaction: any;
  isChecked: boolean = true;
  isData: boolean = true;
  isStatusUpdate: boolean = true;
  mainSection: any;
  searchText:any;
  constructor(private toast: NgToastService, private permission: SettingsService, private compserv: CompanyService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.role_id = localStorage.getItem('token')
    this.userPermissionGet(this.role_id);
    this.CompanyGet();
    this.transactionGet();
    this.companyform = this.fb.group({
      companyid: new FormControl(),
      companyname: new FormControl(),
      logo: new FormControl(),
      contactnumber: new FormControl(),
      email: new FormControl(),
      address: new FormControl(),
      gstnumber: new FormControl(),
      isactive: new FormControl()
    })
  }
  transactionGet() {
    this.compserv.getTrascation().subscribe((res: any) => {
      console.log('transaction', res);
      this.transaction = res;
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
      this.isSection = this.idPermission[0].category;
    })
  }



  CompanyGet() {
    this.compserv.getcompcategory().subscribe((res: any) => {
      console.log('company', res);
      this.mainSection = res;
      this.isChecked = true;
      this.company = res.filter((fil: any) => {
        if (fil.isactive) {
          return fil
        }
      })
      if (this.company.length < 1 || this.company == undefined || this.company == null) {
        this.isData = false;
      }
    })
  }


  CompanyPost() {
    console.log('post', this.companyform.value)
    this.compserv.postcompCategory(this.companyform.value).subscribe((res: any) => {
      console.log(res);
      this.CompanyGet();
      this.companyform.reset();
      this.toast.success({ detail: "Success", summary: res.message });
    })
  }
  filtredIsActive() {
    this.isChecked = !this.isChecked;
    console.log('cc', this.isChecked)
    this.company = this.mainSection;
    let filData = this.company.filter((isFil: any) => {
      if (isFil.isactive === this.isChecked) {
        return isFil
      }
    })
    this.company = filData;
    if (this.company.length < 1 || this.company == undefined || this.company == null) {
      this.isData = false;
    }
    else {
      this.isData = true;
    }
    console.log(this.company)
  }

  patchCompany(value: any) {
    this.companyform.patchValue({
      companyid: value.companyid,
      companyname: value.companyname,
      // logo: value.logo,
      contactnumber: value.contactnumber,
      email: value.email,
      address: value.address,
      gstnumber: value.gstnumber,
      isactive: value.isactive
    })
  }

  StatusUpdate(value: any) {
    let dd = !value.isactive;
    console.log('st', dd)

    let statusdata = {
      companyid: value.companyid,
      companyname: value.companyname,
      // logo: value.logo,
      contactnumber: value.contactnumber,
      email: value.email,
      address: value.address,
      gstnumber: value.gstnumber,
      isactive: dd
    }
    this.compserv.statusUpdateCompany(statusdata).subscribe((res: any) => {
      console.log('statusUpdate', res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.CompanyGet();
    })
  }
  resetcompanyform() {
    this.companyform.reset();
  }






}























