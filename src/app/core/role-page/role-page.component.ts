import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { SubCategoryService } from 'src/app/shared/services/subcategory.service';

@Component({
  selector: 'app-role-page',
  templateUrl: './role-page.component.html',
  styleUrls: ['./role-page.component.scss']
})
export class RolePageComponent {
  idPermission: any;
  isRole!: boolean;
  roleForm!: FormGroup;
  role_id: any;
  searchText: any;
  isChecked: boolean = true;
  isData: boolean = true;
  isStatusUpdate: boolean = true;
  mainRole: any;
  role: any;
  constructor(private permission: SettingsService, private fb: FormBuilder, private rol: SubCategoryService, private toast: NgToastService) { }
  ngOnInit(): void {
    this.role_id = localStorage.getItem('token')
    this.userPermissionGet(this.role_id);
    this.roleGet();
    this.roleForm = this.fb.group({
      id: new FormControl(),
      role_name: new FormControl(),
      role_description: new FormControl(),
      isactive: new FormControl(true)
    })
  }
  roleGet() {
    this.rol.getRole().subscribe((res: any) => {
      console.log('role', res);
      this.mainRole = res;
      this.isChecked = true;
      this.role = res.filter((fil: any) => {
        if (fil.isactive) {
          return fil
        }
      })
      if (this.role.length < 1 || this.role == undefined || this.role == null) {
        this.isData = false;
      }
    })
  }
  filtredIsActive() {
    this.isChecked = !this.isChecked;
    console.log('cc', this.isChecked)
    this.role = this.mainRole;
    let filData = this.role.filter((isFil: any) => {
      if (isFil.isactive === this.isChecked) {
        return isFil
      }
    })
    this.role = filData;
    if (this.role.length < 1 || this.role == undefined || this.role == null) {
      this.isData = false;
    }
    else {
      this.isData = true;
    }
    console.log(this.role)
  }
  userPermissionGet(id: any) {
    this.permission.getUserPermission(id).subscribe((res: any) => {
      if (res.length < 1) {
        console.log(res)

      }
      console.log('permissionGetByIs', res);
      this.idPermission = res;
      console.log(this.idPermission[0].category)
      this.isRole = this.idPermission[0].user_role;
    })
  }



  rolePost() {
    console.log(this.roleForm.value);
    this.rol.postRole(this.roleForm.value).subscribe((res: any) => {
      console.log(res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.roleGet();
      this.roleForm.reset();

    })

  }
  patchRole(value: any) {
    this.roleForm.patchValue({
      id: value.id,
      role_name: value.role_name,
      role_description: value.role_description,
      isactive: value.isactive
    })
  }
  StatusUpdate(value: any) {
    let dd = !value.isactive;
    console.log('st', dd)

    let statusdata = {
      id: value.id,
      role_name: value.role_name,
      role_description: value.role_description,
      isactive: dd
    }
    this.rol.updateSatusRole(statusdata).subscribe((res: any) => {
      console.log('statusUpdate', res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.roleGet();
    })
  }



}
