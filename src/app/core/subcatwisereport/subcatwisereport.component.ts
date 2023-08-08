
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgIf, JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { RepotsService } from 'src/app/shared/services/repots.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SubCategoryService } from 'src/app/shared/services/subcategory.service';






@Component({
  selector: 'app-subcatwisereport',
  templateUrl: './subcatwisereport.component.html',
  styleUrls: ['./subcatwisereport.component.scss']
})
export class SubcatwisereportComponent {
  searchText: any;
  subcatReport: any;
  formDateFilter!: FormGroup;
  catsubReport: any;
  category: any;
  subcategory: any;

  subcatGet() {
    this.report.getSubcatReport(`SalesByCategorySubCategory?fromDate=01%2F01%2F2022&toDate=01%2F01%2F2025&categoryId=0&subcategory_id=0`).subscribe((res: any) => {
      console.log('subCatReport', res);
      this.subcatReport = res;
    })
  }
  ngOnInit(): void {
    this.subcatGet();
    this.categoryGet();
    this.subcategoryGet();
    this.formDateFilter = this.fb.group({
      fromDate: new FormControl(),
      toDate: new FormControl(),
      category_id: new FormControl(),
      subcategory_id: new FormControl()
    })
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Burgers'];
  allFruits: string[] = ['Curries', 'Frys', 'Momos', 'Sea Food'];



  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(private report: RepotsService, private fb: FormBuilder, private cat: CategoryService, public subcatserv: SubCategoryService) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
  applyFilter() {
    console.log(this.formDateFilter.value)
    let fDate = this.formDateFilter.get('fromDate')?.value;
    let tDate = this.formDateFilter.get('toDate')?.value;
    let catId = this.formDateFilter.get('category_id')?.value;
    let subcatId = this.formDateFilter.get('subcategory_id')?.value;


    this.report.getCatReport(`SalesByCategory?fromDate=${fDate}&toDate=${tDate}&category_id=${catId}&subcategory_id=${subcatId}`).subscribe((res: any) => {
      console.log('catReport', res);
      this.subcatReport = res;
    })
  }
  categoryGet() {
    this.cat.getCategory().subscribe((res: any) => {
      console.log('category', res);
      this.category = res
    })
  }
  subcategoryGet() {
    this.subcatserv.getSubcategory().subscribe((res: any) => {
      console.log('subcategory', res);
      this.subcategory = res;

    })
  }
}