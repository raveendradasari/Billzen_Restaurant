
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/shared/services/category.service';

import { SettingsService } from 'src/app/shared/services/settings.service';
import { SubCategoryService } from 'src/app/shared/services/subcategory.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent {
  idPermission: any;
  isSubcategory!: boolean;
  role_id: any;
  subcategory: any;
  category: any;
  subcatForm!: FormGroup;
  categoryall: any;
  mainSubcategory: any;
  isChecked: boolean = true;
  isData: boolean = true;
  searchText:any;

  constructor(private permission: SettingsService, public subcatserv: SubCategoryService, public cat: CategoryService,
    private toast: NgToastService, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.role_id = localStorage.getItem('token')
    this.userPermissionGet(this.role_id);
    this.categoryGet();
    this.subcategoryGet();
    this.subcatForm = this.fb.group({
      subcategoryId: new FormControl(),
      subcategoryName: new FormControl(),
      categoryName: new FormControl(),
      categoryId: new FormControl(),
      isActive: new FormControl()
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

  categoryGet() {
    this.cat.getCategory().subscribe((res: any) => {
      console.log('category', res);
      this.categoryall = res;
    })
  }
  filtredIsActive() {
    this.isChecked = !this.isChecked;
    console.log('cc', this.isChecked)
    this.subcategory = this.mainSubcategory;
    let filData = this.subcategory.filter((isFil: any) => {
      if (isFil.isActive === this.isChecked) {
        return isFil
      }
    })
    this.subcategory = filData;
    if (this.subcategory.length < 1 || this.subcategory == undefined || this.subcategory == null) {
      this.isData = false;
    }
    else {
      this.isData = true;
    }
    console.log(this.subcategory)
  }
  patchSubCat(value: any) {
    this.subcatForm.patchValue({
      subcategoryId: value.subcategoryId,
      subcategoryName: value.subcategoryName,
      categoryName: value.categoryName,
      categoryId: value.categoryId,
      isActive: value.isActive
    })
  }
  StatusUpdate(value: any) {
    let dd = !value.isActive;
    console.log('st', dd)

    let statusdata = {
      subcategoryId: value.subcategoryId,
      subcategoryName: value.subcategoryName,
      categoryName: value.categoryName,
      categoryId: value.categoryId,
      isActive: dd
    }
    console.log('upd', statusdata)
    this.cat.updateSatusSubCat(statusdata).subscribe((res: any) => {
      console.log('statusUpdate', res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.subcategoryGet();
    })
  }
  resetcatForm() {
    this.subcatForm.reset();
  }



  subcategoryGet() {
    this.subcatserv.getSubcategory().subscribe((res: any) => {
      console.log('subcategory', res);
      this.mainSubcategory = res;
      this.isChecked = true;
      this.subcategory = res.filter((fil: any) => {
        if (fil.isActive) {
          return fil
        }
      })
      if (this.subcategory.length < 1 || this.isChecked == undefined || this.isChecked == null) {
        this.isData = false;
      }
    })
  }


  subcategoryPost() {
    console.log(this.subcatForm.value);
    this.subcatserv.postSubCategory(this.subcatForm.value).subscribe((res: any) => {
      console.log(res);
      this.subcategoryGet();
      this.subcatForm.reset();
      this.toast.success({ detail: "Success", summary: res.message });
    })
  }



}
