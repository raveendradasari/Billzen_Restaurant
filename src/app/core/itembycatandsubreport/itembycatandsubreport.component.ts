
import { RepotsService } from 'src/app/shared/services/repots.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule,FormGroup, FormBuilder} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SubCategoryService } from 'src/app/shared/services/subcategory.service';





@Component({
  selector: 'app-itembycatandsubreport',
  templateUrl: './itembycatandsubreport.component.html',
  styleUrls: ['./itembycatandsubreport.component.scss']
})
export class ItembycatandsubreportComponent {


  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Burgers'];
  allFruits: string[] = ['Curries', 'Frys', 'Momos', 'Sea Food'];
  formDateFilter!: FormGroup;

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);
  subcategory: any;
  category: any;


  constructor(private report:RepotsService, private fb: FormBuilder, private cat: CategoryService,public subcatserv: SubCategoryService) {
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










  searchText:any;
  catsubReport: any;
 
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  ngOnInit():void{
    this.catsubReportGet();
    this.categoryGet();
    this.subcategoryGet();
    this.formDateFilter = this.fb.group({
      fromDate: new FormControl(),
      toDate: new FormControl(),
      category_id:new FormControl(),
      subcategory_id:new FormControl()
    })
  }
  catsubReportGet(){
    this.report.getCatSubReort(`SalesByCategorySubCategory?fromDate=01%2F01%2F2022&toDate=01%2F01%2F2025&categoryId=0&subcategory_id=0`).subscribe((res:any)=>{
      console.log('catsubReport',res);
      this.catsubReport=res;
    })
  }
  subcategoryGet() {
    this.subcatserv.getSubcategory().subscribe((res: any) => {
      console.log('subcategory', res);
      this.subcategory = res;
    
    })
  }
  applyFilter(){
    console.log(this.formDateFilter.value)
    let fDate=this.formDateFilter.get('fromDate')?.value;
    let tDate=this.formDateFilter.get('toDate')?.value;
    let catId=this.formDateFilter.get('category_id')?.value;
    let subcatId=this.formDateFilter.get('subcategory_id')?.value;


    this.report.getCatReport(`SalesByCategory?fromDate=${fDate}&toDate=${tDate}&category_id=${catId}&subcategory_id=${subcatId}`).subscribe((res: any) => {
      console.log('catReport', res);
      this.catsubReport = res;
    })
  }
  categoryGet() {
    this.cat.getCategory().subscribe((res: any) => {
      console.log('category', res);
      this.category = res
    })
  }
}
