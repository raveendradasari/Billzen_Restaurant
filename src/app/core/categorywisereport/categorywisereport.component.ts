import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category.service';
import { RepotsService } from 'src/app/shared/services/repots.service';

@Component({
  selector: 'app-categorywisereport',
  templateUrl: './categorywisereport.component.html',
  styleUrls: ['./categorywisereport.component.scss']
})
export class CategorywisereportComponent {
  catReport: any;
  formDateFilter!: FormGroup;
  category: any;
  constructor(private report: RepotsService, private fb: FormBuilder, private cat: CategoryService) {
  }
  searchText: any;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  ngOnInit(): void {
    this.categoryGet();
    this.formDateFilter = this.fb.group({
      fromDate: new FormControl(),
      toDate: new FormControl(),
      category_id:new FormControl()
    })
    this.catReportGet();
  }
  catReportGet() {
    this.report.getCatReport('SalesByCategory?fromDate=01%2F01%2F2022&toDate=01%2F01%2F2025&category_id=0').subscribe((res: any) => {
      console.log('catReport', res);
      this.catReport = res;
    })
  }
  applyFilter(){
    console.log(this.formDateFilter.value)
    let fDate=this.formDateFilter.get('fromDate')?.value;
    let tDate=this.formDateFilter.get('toDate')?.value;
    let catId=this.formDateFilter.get('category_id')?.value;

    this.report.getCatReport(`SalesByCategory?fromDate=${fDate}&toDate=${tDate}&category_id=${catId}`).subscribe((res: any) => {
      console.log('catReport', res);
      this.catReport = res;
    })
  }
  categoryGet() {
    this.cat.getCategory().subscribe((res: any) => {
      console.log('category', res);
      this.category = res
    })
  }
}
