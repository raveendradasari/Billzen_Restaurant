import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ItemsService } from 'src/app/shared/services/items.service';
import { SectionService } from 'src/app/shared/services/section.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { SubCategoryService } from 'src/app/shared/services/subcategory.service';

@Component({
  selector: 'app-tax-master',
  templateUrl: './tax-master.component.html',
  styleUrls: ['./tax-master.component.scss']
})
export class TaxMasterComponent {

  idPermission: any;
  isSubcategory!: boolean;
  role_id: any;
  tax: any;
  taxForm!: FormGroup;
  taxAll: any;
  transaction: any;
  isChecked: boolean = true;
  isData: boolean = true;
  isStatusUpdate: boolean = true;
  mainTaxAll: any;
  searchText:any;
  constructor(private permission: SettingsService, public subcatserv: SubCategoryService, public cat: CategoryService,
    private toast: NgToastService, private fb: FormBuilder, private item: ItemsService, private sectnserv: SectionService,) { }


  ngOnInit(): void {
    this.role_id = localStorage.getItem('token')
    this.userPermissionGet(this.role_id);
    this.taxGet();
    this.transactionGet();
    this.taxForm = this.fb.group({

      taxId: new FormControl(''),
      taxName: new FormControl(''),
      tax_percent: new FormControl(''),
      transactionId: new FormControl(''),
      isactive: new FormControl('')

    })
  }
  transactionGet() {
    this.sectnserv.getTrascation().subscribe((res: any) => {
      console.log('transaction', res);
      this.transaction = res;
    })

  }

  postTax() {
    console.log(this.taxForm.value);
    this.item.postTax(this.taxForm.value).subscribe((res: any) => {
      console.log(res);
      this.taxGet();
      this.taxForm.reset();
      this.toast.success({ detail: "Success", summary: res.message });

    })
  }
  updateTax(value: any) {
    this.taxForm.patchValue({
      taxId: value.taxId,
      taxName: value.taxName,
      tax_percent: value.tax_percent,
      transactionId: value.transactionId,
      isactive: value.isactive
    })
  }
  StatusUpdate(value: any) {
    let dd = !value.isactive;
    console.log('st', dd)

    let statusdata = {
      taxId: value.taxId,
      taxName: value.taxName,
      tax_percent: value.tax_percent,
      transactionId: value.transactionId,
      isactive: dd
    }
    this.item.updateSatusShift(statusdata).subscribe((res: any) => {
      console.log('statusUpdate', res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.taxGet();
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
      this.isSubcategory = this.idPermission[0].sub_category;
    })
  }


  taxGet() {
    this.item.getTax().subscribe((res: any) => {
      console.log('tax', res);
      this.mainTaxAll = res;
      this.isChecked = true;
      this.taxAll = res.filter((fil: any) => {
        if (fil.isactive) {
          return fil
        }
      })
      if (this.taxAll.length < 1 || this.taxAll == undefined || this.taxAll == null) {
        this.isData = false;
      }
    })
  }
  filtredIsActive() {
    this.isChecked = !this.isChecked;
    console.log('cc', this.isChecked)
    this.taxAll = this.mainTaxAll;
    let filData = this.taxAll.filter((isFil: any) => {
      if (isFil.isactive === this.isChecked) {
        return isFil
      }
    })
    this.taxAll = filData;
    if (this.taxAll.length < 1 || this.taxAll == undefined || this.taxAll == null) {
      this.isData = false;
    }
    else {
      this.isData = true;
    }
    console.log(this.taxAll)
  }

}





