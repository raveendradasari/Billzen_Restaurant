import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { SubCategoryService } from 'src/app/shared/services/subcategory.service';
import { UserRoleService } from 'src/app/shared/services/user-role.service';

@Component({
  selector: 'app-userroles',
  templateUrl: './userroles.component.html',
  styleUrls: ['./userroles.component.scss']
})
export class UserrolesComponent {
  idPermission: any;
  isUserrole!: boolean;
  role_id: any;
  User: any;
  userForm!: FormGroup;
  searchText: any;
  role: any;
  isChecked: boolean = true;
  isData: boolean = true;
  isStatusUpdate: boolean = true;
  userMain: any;
  constructor(private permission: SettingsService, private toast: NgToastService, private user: UserRoleService, private fb: FormBuilder, private rol: SubCategoryService) { }
  ngOnInit(): void {
    this.role_id = localStorage.getItem('token')
    this.userPermissionGet(this.role_id);
    this.userGet();
    this.roleGet();
    this.userForm = this.fb.group({
      id: new FormControl(),
      role_id: new FormControl(),
      login_id: new FormControl(),
      password: new FormControl(),
      full_name: new FormControl(),
      is_active: new FormControl(true)
    })
  }
  roleGet() {
    this.rol.getRole().subscribe((res: any) => {
      console.log('role', res);
      this.role = res;

    })
  }
  userGet() {
    this.user.getUserRole().subscribe((res: any) => {
      console.log('userRole', res);
      this.userMain = res;
      this.User = res.filter((fil: any) => {
        if (fil.is_active) {
          return fil
        }
      })
      if (this.User.length < 1 || this.User == undefined || this.User == null) {
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
      this.isUserrole = this.idPermission[0].user_role;
    })
  }
  postUser() {
    console.log(this.userForm.value);
    this.user.postUserrole(this.userForm.value).subscribe((res: any) => {
      console.log(res);
      this.userForm.reset();
      this.userGet();
      this.toast.success({ detail: "Success", summary: res.message });

    })
  }
  patchUser(value: any) {
    this.userForm.patchValue({
      id: value.id,
      role_id: value.role_id,
      login_id: value.login_id,
      password: value.password,
      full_name: value.full_name,
      is_active: value.is_active
    })
  }
  StatusUpdate(value: any) {
    let dd = !value.isactive;
    console.log('st', dd)

    let statusdata = {
      id: value.id,
      role_id: value.role_id,
      login_id: value.login_id,
      password: value.password,
      full_name: value.full_name,
      is_active: dd
    }
    this.user.updateSatusUserrole(statusdata).subscribe((res: any) => {
      console.log('statusUpdate', res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.userGet();
    })
  }
  filtredIsActive() {
    this.isChecked = !this.isChecked;
    console.log('cc', this.isChecked)
    this.User = this.userMain;
    let filData = this.User.filter((isFil: any) => {
      if (isFil.is_active === this.isChecked) {
        return isFil
      }
    })
    this.User = filData;
    if (this.User.length < 1 || this.User == undefined || this.User == null) {
      this.isData = false;
    }
    else {
      this.isData = true;
    }
    console.log(this.User)
  }
}
