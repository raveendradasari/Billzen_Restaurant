import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ItemsService } from 'src/app/shared/services/items.service';
import { DatePipe } from '@angular/common';
import { concatAll } from 'rxjs';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent {
  isChecked: boolean = true;
  isData: boolean = true;
  isStatusUpdate: boolean = true;
  shift: any;
  shiftForm!: FormGroup;
  mainShift: any;
  searchText:any;
  

  constructor(private item: ItemsService, private fb: FormBuilder, private toast: NgToastService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.shiftGet();
    this.shiftForm = this.fb.group({

      shiftId: new FormControl(),
      shift_name: new FormControl(),
      shift_start_time: new FormControl(),
      shift_end_time: new FormControl(),
      shift_start_date: new FormControl(),
      shift_end_date: new FormControl(),
      isactive: new FormControl(false)
    })
  }
  shiftGet() {
    this.item.getShift().subscribe((res: any) => {
      console.log('shift', res);
      this.mainShift = res;
      this.isChecked = true;
      this.shift = res.filter((fil: any) => {
        if (fil.isactive) {
          return fil
        }
      })
      if (this.shift.length < 1 || this.shift == undefined || this.shift == null) {
        this.isData = false;
      }
    })
  }
  filtredIsActive() {
    this.isChecked = !this.isChecked;
    console.log('cc', this.isChecked)
    this.shift = this.mainShift;
    let filData = this.shift.filter((isFil: any) => {
      if (isFil.isactive === this.isChecked) {
        return isFil
      }
    })
    this.shift = filData;
    if (this.shift.length < 1 || this.shift == undefined || this.shift == null) {
      this.isData = false;
    }
    else {
      this.isData = true;
    }
    console.log(this.shift)
  }
  shiftPost() {
    console.log(this.shiftForm.value)
    this.item.postShift(this.shiftForm.value).subscribe((res: any) => {
      console.log(res);
      this.shiftForm.reset();
      this.toast.success({ detail: "Success", summary: res.message });
      this.shiftGet();
    })
  }
  StatusUpdate(value: any) {
    let dd = !value.isactive;
    console.log('st', dd)
    const formattedDateStart = this.datePipe.transform(value.shift_start_date, 'yyyy-MM-dd');
    const formattedDateEndt = this.datePipe.transform(value.shift_end_date, 'yyyy-MM-dd');
    let statusdata = {
      shiftId: value.shiftId,
      shift_name: value.shift_name,
      shift_start_date: formattedDateStart,
      shift_end_date: formattedDateEndt,
      shift_start_time: value.shift_start_time,
      shift_end_time: value.shift_start_time,
      isactive: dd
    }
    this.item.updateSatusShift(statusdata).subscribe((res: any) => {
      console.log('statusUpdate', res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.shiftGet();
    })
  }
  updateShift(value: any) {
    const start = value.shift_start_date;
    const end = value.shift_end_date;
    const formattedDateStart = this.datePipe.transform(start, 'yyyy-MM-dd');
    const formattedDateEndt = this.datePipe.transform(end, 'yyyy-MM-dd');
    this.shiftForm.patchValue({
      shiftId: value.shiftId,
      shift_name: value.shift_name,
      shift_start_date: formattedDateStart,
      shift_end_date: formattedDateEndt,
      shift_start_time: value.shift_start_time,
      shift_end_time: value.shift_start_time,
      isactive: value.isactive
    })
  }
}
