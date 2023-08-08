import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SettingsService } from 'src/app/shared/services/settings.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent {
  idPermission: any;
  isCategory!: boolean;
  role_id: any;
  category: any;
  catForm!: FormGroup;
  isUpdate: boolean = false;
  mainCategory: any;
  isData: boolean = true;
  isChecked: boolean = true;
  searchText:any;

  constructor(private toast: NgToastService, private permission: SettingsService, private cat: CategoryService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.role_id = localStorage.getItem('token')
    this.userPermissionGet(this.role_id);
    this.categoryGet();
    this.catForm = this.fb.group({
      categoryId: new FormControl(),
      categoryName: new FormControl(),
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
      this.isCategory = this.idPermission[0].category;
    })
  }

  filtredIsActive() {
    this.isChecked = !this.isChecked;
    console.log('cc', this.isChecked)
    this.category = this.mainCategory;
    let filData = this.category.filter((isFil: any) => {
      if (isFil.isActive === this.isChecked) {
        return isFil
      }
    })
    this.category = filData;
    if (this.category.length < 1 || this.category == undefined || this.category == null) {
      this.isData = false;
    }
    else {
      this.isData = true;
    }
    console.log(this.category)
  }
  categoryGet() {
    this.cat.getCategory().subscribe((res: any) => {
      console.log('category', res);
      this.isChecked = true;
      this.mainCategory = res;
      this.category = res.filter((fil: any) => {
        if (fil.isActive) {
          return fil
        }
      })
      if (this.category.length < 1 || this.category == undefined || this.category == null) {
        this.isData = false;
      }
    })
  }

  categoryPost() {
    console.log(this.catForm.value)
    this.cat.postCategory(this.catForm.value).subscribe((res: any) => {
      console.log(res);
      this.categoryGet();
      this.catForm.reset();
      this.isUpdate = false;
      this.toast.success({ detail: "Success", summary: res.message });

    })
  }

  patchCat(value: any) {
    this.isUpdate = true;
    this.catForm.patchValue({
      categoryId: value.categoryId,
      categoryName: value.categoryName,
      isActive: value.isActive
    })
  }
  StatusUpdate(value: any) {
    let dd = !value.isActive;
    console.log('st', dd)

    let statusdata = {
      categoryId: value.categoryId,
      categoryName: value.categoryName,
      isActive: dd
    }
    this.cat.updateStausCategory(statusdata).subscribe((res: any) => {
      console.log('statusUpdate', res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.categoryGet();
    })
  }
  resetcatForm() {
    this.catForm.reset();
    this.isUpdate = false;
  }
}

