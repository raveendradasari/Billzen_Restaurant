import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ItemsService } from 'src/app/shared/services/items.service';

@Component({
  selector: 'app-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.scss']
})
export class UomComponent {
  unit: any;
  unitForm!: FormGroup;
  isStatusUpdate: boolean = true;
  isChecked: boolean = true;
  isData: boolean = true;
  mainUnit: any;
  searchText:any;
  constructor(private fb: FormBuilder, private item: ItemsService, private toast: NgToastService) { }
  ngOnInit(): void {
    this.unitGet();
    this.unitForm = this.fb.group({
      id: new FormControl(),
      name: new FormControl(),
      isactive: new FormControl()
    })
  }
  unitGet() {
    this.item.getUnit().subscribe((res: any) => {
      console.log('unit', res);
      // this.unit = res;
      this.mainUnit = res;
      this.isChecked = true;
      this.unit = res.filter((fil: any) => {
        if (fil.isactive) {
          return fil
        }
      })
      if (this.unit.length < 1 || this.unit == undefined || this.unit == null) {
        this.isData = false;
      }
    })
  }
  unitPost() {
    console.log(this.unitForm.value);
    this.item.postUnit(this.unitForm.value).subscribe((res: any) => {
      console.log(res);
      this.unitForm.reset();
      this.toast.success({ detail: "Success", summary: res.message });
      this.unitGet();
    })
  }
  updateUnit(value: any) {
    this.unitForm.patchValue({
      id: value.id,
      name: value.name,
      isactive: value.isactive
    })
  }
  filtredIsActive() {
    this.isChecked = !this.isChecked;
    console.log('cc', this.isChecked)
    this.unit = this.mainUnit;
    let filData = this.unit.filter((isFil: any) => {
      if (isFil.isactive === this.isChecked) {
        return isFil
      }
    })
    this.unit = filData;
    if (this.unit.length < 1 || this.unit == undefined || this.unit == null) {
      this.isData = false;
    }
    else {
      this.isData = true;
    }
    console.log(this.unit)
  }
  StatusUpdate(value: any) {
    let dd = !value.isactive;
    console.log('st', dd);
    let statusdata = {
      id: value.id,
      name: value.name,
      isactive: dd
    }
    this.item.statusUpdateUnit(statusdata).subscribe((res: any) => {
      console.log('statusUpdate', res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.unitGet();
    })

  }
}
