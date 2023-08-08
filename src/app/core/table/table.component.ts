import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ItemsService } from 'src/app/shared/services/items.service';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  table: any;
  tableForm!: FormGroup;
  bulkTableForm!: FormGroup;
  section: any;
  isStatusUpdate: boolean = true;
  isChecked: boolean = true;
  maintable: any;
  searchText: any;
  isData: boolean = true;
  largestValue!: number;
  activeSection: any;
  selectedSectionID!:number;
  constructor(private toast: NgToastService, private permission: SettingsService, private item: ItemsService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.tableGet();
    this.sectionGet();
    this.tableForm = this.fb.group({
      tableId: new FormControl(),
      name: new FormControl(),
      sectionId: new FormControl(),
      isactive: new FormControl()
    })
    this.bulkTableForm = this.fb.group({
      tableId: new FormControl(),
      name: new FormControl(),
      sectionId: new FormControl(),
      isactive: new FormControl(true)
    })
  }
  updateTable(value: any) {
    this.tableForm.patchValue({
      tableId: value.tableId,
      name: value.name,
      sectionId: value.sectionId,
      isactive: value.isactive
    })
  }
  filtredIsActive() {
    this.isChecked = !this.isChecked;
    console.log('cc', this.isChecked)
    this.table = this.maintable;
    let filData = this.table.filter((isFil: any) => {
      if (isFil.isactive === this.isChecked) {
        return isFil
      }
    })
    this.table = filData;
    if (this.table.length < 1 || this.table == undefined || this.table == null) {
      this.isData = false;
    }
    else {
      this.isData = true;
    }
    console.log(this.table)
  }
  StatusUpdate(value: any) {
    let dd = !value.isactive;
    console.log('st', dd)

    let statusdata = {
      tableId: value.tableId,
      name: value.name,
      sectionId: value.sectionId,
      isactive: dd
    }
    this.item.updateSatusTable(statusdata).subscribe((res: any) => {
      console.log('statusUpdate', res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.tableGet();
    })
  }
  tableGet() {
    this.item.getTable().subscribe((res: any) => {
      console.log('table', res);
      // this.table = res;
      this.isChecked = true;
      this.maintable = res;
      this.table = res.filter((fil: any) => {
        if (fil.isactive) {
          return fil
        }
      })
      if (this.table.length < 1 || this.table == undefined || this.table == null) {
        this.isData = false;
      }
    })
  }
  bulkTablePost() {
    console.log(this.bulkTableForm.value);
    let tableNumbers = this.bulkTableForm.get('name')?.value;
    let tableSection = this.bulkTableForm.get('sectionId')?.value;
    let selectedFilter = this.maintable.filter((a: any) => {
      console.log('secid', a.sectionId)
      if (a.sectionId == tableSection) {
        return a;
      }
    })
    console.log('selectedfilter', selectedFilter);
    let names: any[] = [];
    let numberOnly: any = selectedFilter.filter((b: any) => {
      return b.name
    });
    console.log('numberOnly', numberOnly)
    numberOnly.forEach((data: any) => {
      // console.log('typeof', typeof (data.name))
      // if (typeof data.name === 'number') {
      //   names.push(data.name);
      // }
      const parsedNumber = parseFloat(data.name); // Use parseFloat for floating-point numbers or parseInt for integers

      if (!isNaN(parsedNumber)) {
        names.push(parsedNumber);
      }
    });
    // names.forEach((d: any) => {
    //   console.log('dddd', typeof d)
    // })
    console.log('finalNumber', names);
    if (names.length == 0) {
      this.largestValue = 0;
      console.log('LNoIF', this.largestValue);
    }
    else {
      this.largestValue = Math.max(...names);
      console.log('LNo', this.largestValue);
    }
    console.log('LNoF', this.largestValue);
    let secId = this.bulkTableForm.get('sectionId')?.value;
    let iActive = this.bulkTableForm.get('isactive')?.value;
    for (let i = 1; i <= tableNumbers; i++) {
      let tableIndex = {
        name: i + this.largestValue,
        sectionId: secId,
        isactive: true
      }
      console.log('tIndex', tableIndex)
      this.item.postTable(tableIndex).subscribe((res: any) => {
        console.log(res);
      // //   // this.tableGet();
      // //   // this.toast.success({ detail: "Success", summary: res.message });
      // //   // this.tableForm.reset();
      })
      this.toast.success({ detail: "Success", summary: "Tables created successfully." });
      this.tableGet()
      this.bulkTableForm.reset();
    }
  }
  tablePost() {
    console.log(this.tableForm.value);
    this.item.postTable(this.tableForm.value).subscribe((res: any) => {
      console.log(res);
      this.tableGet();
      this.toast.success({ detail: "Success", summary: res.message });
      this.tableForm.reset();
    })
  }
  sectionGet() {
    this.item.getSection().subscribe((res: any) => {
      console.log('section', res);
      this.section = res;
      this.activeSection = res.filter((fil: any) => {
        if (fil.isactive) {
          return fil
        }
      })
    })
  }
  getselectedID(event:any){
    console.log(event.target.value);
    console.log('TABLE',this.table);
    console.log('MAIN',this.maintable)

    this.table = this.maintable.filter((fil: any) => {
      console.log('sId',fil.sectionId,event.target.value)
      if (fil.sectionId==event.target.value) {
        return fil
      }
    })
  }
}
