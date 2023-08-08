import {Component} from '@angular/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {NgIf, JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { RepotsService } from 'src/app/shared/services/repots.service';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-itemwisereport',
  templateUrl: './itemwisereport.component.html',
  styleUrls: ['./itemwisereport.component.scss']
})
export class ItemwisereportComponent {

  searchText:any;
  itemReport: any;
  formDateFilter!: FormGroup;

  constructor(private report:RepotsService,private fb: FormBuilder, private cat: CategoryService){
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  ngOnInit():void{
    // this.categoryGet();
    this.formDateFilter = this.fb.group({
      fromDate: new FormControl(),
      toDate: new FormControl(),
      // category_id:new FormControl()
    })
    this.itemReportGet();
  }
  itemReportGet(){
    this.report.getItemReort(`SalesByItem?fromDate=01%2F01%2F2022&toDate=01%2F01%2F2025`).subscribe((res:any)=>{
      console.log('itemReport',res);
      this.itemReport=res;
    })
  }
  applyFilter(){
    console.log(this.formDateFilter.value)
    let fDate=this.formDateFilter.get('fromDate')?.value;
    let tDate=this.formDateFilter.get('toDate')?.value;
    let catId=this.formDateFilter.get('category_id')?.value;

    this.report.getItemReort(`SalesByItem?fromDate=${fDate}&toDate=${tDate}`).subscribe((res: any) => {
      console.log('catReport', res);
      this.itemReport = res;
    })
  }
  // categoryGet() {
  //   this.cat.getCategory().subscribe((res: any) => {
  //     console.log('category', res);
  //     this.category = res
  //   })
  // }
}
