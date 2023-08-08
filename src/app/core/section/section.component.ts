import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/shared/services/section.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {

  idPermission: any;
  isSection!: boolean;
  role_id: any;
  section: any;
  sectionform!: FormGroup;
  isUpdate: boolean = false;
  transaction: any;
  isChecked: boolean = true;
  isData: boolean = true;
  isStatusUpdate: boolean = true;
  mainSection: any;
  searchText:any;
  constructor(private toast: NgToastService, private permission: SettingsService, private sectnserv: SectionService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.role_id = localStorage.getItem('token')
    this.userPermissionGet(this.role_id);
    this.sectionGet();
    this.transactionGet();
    this.sectionform = this.fb.group({
      sectionId: new FormControl(),
      name: new FormControl(),
      transactionId: new FormControl(),
      isactive: new FormControl()
    })
  }
  transactionGet() {
    this.sectnserv.getTrascation().subscribe((res: any) => {
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

  sectionGet() {
    this.sectnserv.getseccategory().subscribe((res: any) => {
      console.log('sectioncategory', res);
      this.mainSection = res;
      this.isChecked = true;
      this.section = res.filter((fil: any) => {
        if (fil.isactive) {
          return fil
        }
      })
      if (this.section.length < 1 || this.section == undefined || this.section == null) {
        this.isData = false;
      }
    })
  }


  sectioncategoryPost() {
    console.log('post', this.sectionform.value)
    this.sectnserv.postsecCategory(this.sectionform.value).subscribe((res: any) => {
      console.log(res);
      this.sectionGet();
      this.sectionform.reset();
      this.toast.success({ detail: "Success", summary: res.message });
    })
  }
  filtredIsActive() {
    this.isChecked = !this.isChecked;
    console.log('cc', this.isChecked)
    this.section = this.mainSection;
    let filData = this.section.filter((isFil: any) => {
      if (isFil.isactive === this.isChecked) {
        return isFil
      }
    })
    this.section = filData;
    if (this.section.length < 1 || this.section == undefined || this.section == null) {
      this.isData = false;
    }
    else {
      this.isData = true;
    }
    console.log(this.section)
  }

  patchSection(value: any) {
    this.sectionform.patchValue({
      sectionId: value.sectionId,
      name: value.name,
      transactionId: value.transactionId,
      isactive: value.isactive
    })
  }

  StatusUpdate(value: any) {
    let dd = !value.isactive;
    console.log('st', dd)

    let statusdata = {
      sectionId: value.sectionId,
      name: value.name,
      transactionId: value.transactionId,
      isactive: dd
    }
    this.sectnserv.statusUpdateSection(statusdata).subscribe((res: any) => {
      console.log('statusUpdate', res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.sectionGet();
    })
  }
  resetsectionform() {
    this.sectionform.reset();
  }






}






















