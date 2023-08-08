import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemsService } from 'src/app/shared/services/items.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { DatePipe } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrls: ['./staff-page.component.scss']
})
export class StaffPageComponent {
  idPermission: any;
  isStaff!: boolean;
  role_id: any;
  staff: any;
  staffForm!: FormGroup;
  mainStaff: any;
  isChecked: boolean = true;
  isData: boolean = true;
  isStatusUpdate: boolean = true;
  searchText:any;
  constructor(private permission: SettingsService, private toast: NgToastService, private item: ItemsService, private fb: FormBuilder, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.role_id = localStorage.getItem('token')
    this.userPermissionGet(this.role_id);
    this.staffGet();
    this.staffForm = this.fb.group({
      staffId: new FormControl(),
      staff_name: new FormControl(''),
      Mobilenumber: new FormControl(''),
      address: new FormControl(''),
      joiningdate: new FormControl(),
      refferedby: new FormControl(''),
      designation: new FormControl(''),
      department: new FormControl(''),
      document_type: new FormControl(''),
      documentdetails: new FormControl(''),
      isactive: new FormControl('')
    })
  }
  staffGet() {
    this.item.getStaff().subscribe((res: any) => {
      console.log('staff', res);
      this.mainStaff = res;
      this.isChecked = true;
      this.staff = res.filter((fil: any) => {
        if (fil.isactive) {
          return fil
        }
      })
      if (this.staff.length < 1 || this.staff == undefined || this.staff == null) {
        this.isData = false;
      }
    })
  }
  filtredIsActive() {
    this.isChecked = !this.isChecked;
    console.log('cc', this.isChecked)
    this.staff = this.mainStaff;
    let filData = this.staff.filter((isFil: any) => {
      if (isFil.isactive === this.isChecked) {
        return isFil
      }
    })
    this.staff = filData;
    if (this.staff.length < 1 || this.staff == undefined || this.staff == null) {
      this.isData = false;
    }
    else {
      this.isData = true;
    }
    console.log(this.staff)
  }
  postStaf() {
    console.log(this.staffForm.value);
    this.item.postStaff(this.staffForm.value).subscribe((res: any) => {
      console.log(res);
      this.staffGet();
      this.staffForm.reset();
      this.toast.success({ detail: "Success", summary: res.message });

      // this.staffForm.reset();
    })
  }
  updateStaff(value: any) {
    console.log(value)
    const inputDate = value.joiningdate;
    const formattedDate = this.datePipe.transform(inputDate, 'yyyy-MM-dd');
    console.log(formattedDate); // Output: 2023-06-07
    this.staffForm.patchValue({
      staffId: value.staffId,
      staff_name: value.staff_name,
      Mobilenumber: value.Mobilenumber,
      address: value.address,
      joiningdate: formattedDate,
      refferedby: value.refferedby,
      designation: value.designation,
      department: value.department,
      document_type: value.document_type,
      documentdetails: value.documentdetails,
      isactive: value.isactive
    })

  }
  StatusUpdate(value: any) {
    let dd = !value.isactive;
    console.log('st', dd)
    const inputDate = value.joiningdate;
    const formattedDate = this.datePipe.transform(inputDate, 'yyyy-MM-dd');
    let statusdata = {
      staffId: value.staffId,
      staff_name: value.staff_name,
      Mobilenumber: value.Mobilenumber,
      address: value.address,
      joiningdate: formattedDate,
      refferedby: value.refferedby,
      designation: value.designation,
      department: value.department,
      document_type: value.document_type,
      documentdetails: value.documentdetails,
      isactive: dd
    }
    this.item.updateSatusShift(statusdata).subscribe((res: any) => {
      console.log('statusUpdate', res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.staffGet();
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
      this.isStaff = this.idPermission[0].staff;
    })
  }
}
