import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Validators } from 'ngx-editor';
import { ItemsService } from 'src/app/shared/services/items.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// import * as FileSaver from 'file-saver';

// import * as XLSX from 'xlsx';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {
  tItemId = 0;
  category: any;
  subcategory: any;
  units: any;
  itemForm!: FormGroup;
  section: any;
  items: any;
  tax: any;
  TaxItems: any = [];
  taxItm: any = {};
  isChecked: boolean = true;
  isData: boolean = true;
  isStatusUpdate: boolean = true;
  searchText: any;
  item_id: any;
  transation: any;
  ischecked: boolean = false;
  excelData: any;
  mainItem: any;
  constructor(private toast: NgToastService, private item: ItemsService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.categoryGet();
    this.subcategoryGet();
    this.unitGet();
    this.transactionGet();

    this.sectionGet();
    this.taxGet();


    this.itemGet();//ye kyon yha h oh tble data

    this.itemForm = this.fb.group({
      itemId: new FormControl(''),
      item_name: new FormControl(''),
      categoryId: new FormControl(''),
      subcategoryId: new FormControl(''),
      unitId: new FormControl(''),
      taxRate: new FormControl(''),
      barCode: new FormControl(''),
      hsnCode: new FormControl(''),
      salePrice: new FormControl(''),
      discount_percentage: new FormControl(''),
      TransactionItems: this.fb.array([]),
      SectionItemRates: this.fb.array([]),
      taxItems: this.fb.array([])
    })

  }
  willDownload: any = false;
  onFileChange(ev: any) {
    let workBook: any = null;
    let jsonData: any = null;
    const reader = new FileReader();
    const file: any = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet: any = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      console.log('excell', JSON.parse(dataString));
      this.excelData = JSON.parse(dataString);
      console.log('00', this.excelData.Sheet1.length);
      for (let i = 0; i < (this.excelData.Sheet1).length; i++) {
        this.item.postItem(this.excelData.Sheet1[i]).subscribe((res: any) => {
          console.log(res);
        })
      }
      this.toast.success({ detail: "Success", summary: "All item uploaded successfully." });
      console.log('succees');
      // document.getElementById('output').innerHTML = dataString
      //   .slice(0, 300)
      //   .concat('...');
      // this.setDownload(dataString);
      // console.log(JSON.parse(dataString));
    };
    reader.readAsBinaryString(file);
    console.log(file);
    this.itemGet();

  }
  patchValueUp(value: any) {
    // debugger;
    let id = value.itemId;
    this.item.getItemByID(id).subscribe((res: any) => {
      console.log(res);

    })
    // let newTxc: any = [];
    // this.tax.forEach((tax: any) => {
    //   let txT = {
    //     itemTaxId: 0,
    //     itemId: 0,
    //     taxId: tax.taxId,
    //     isActive: tax.isActive,
    //   };
    // //   let iftx = value.TaxItems.find((x: { taxId: any; }) => x.taxId == tax.taxtId);
    //   if (iftx) {
    //     txT.isActive =iftx.isActive;
    //     txT.itemTaxId = iftx.itemTaxId;
    //     txT.itemId = iftx.itemId;
    //   }
    //   newTxc.push(txT)
    //   console.log(newTxc)

    // })
    console.log('value', value)
    this.tItemId = value.itemId;
    this.itemForm.patchValue({
      itemId: value.itemId,
      item_name: value.item_name,
      categoryId: value.categoryId,
      subcategoryId: value.subcategoryId,
      unitId: value.unitId,
      taxRate: value.taxRate,
      barCode: value.barCode,
      hsnCode: value.hsnCode,
      salePrice: value.salePrice,
      discount_percentage: value.discount_percentage,
      TransactionItems: value.TransactionItems,
      SectionItemRates: value.SectionItemRates,
      taxItems: value.TaxItems
    })



  }

  StatusUpdate(value: any) {
    let id = value.itemId;
    this.item.getItemByID(id).subscribe((res: any) => {
      console.log(res);

    })
    let dd = !value.isActive;
    console.log('st', dd)

    let statusdata = {
      itemId: value.itemId,
      item_name: value.item_name,
      categoryId: value.categoryId,
      subcategoryId: value.subcategoryId,
      unitId: value.unitId,
      taxRate: value.taxRate,
      barCode: value.barCode,
      hsnCode: value.hsnCode,
      salePrice: value.salePrice,
      discount_percentage: value.discount_percentage,
      TransactionItems: value.TransactionItems,
      SectionItemRates: value.SectionItemRates,
      taxItems: value.TaxItems,
      isActive: dd
    }
    this.item.updateSatusItem(statusdata).subscribe((res: any) => {
      console.log('statusUpdate', res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.itemGet();
    })
  }
  get SectionItemRates(): FormArray {
    return this.itemForm.get("SectionItemRates") as FormArray
  }
  get taxItems(): FormArray {
    return this.itemForm.get('taxItems') as FormArray;
  }
  addTaxItems() {
    this.taxItems.push(this.fb.group({
      taxId: new FormControl(''),
    }))
  }
  onSubmitItem() {
    console.log(this.itemForm.value)
    this.item.postItem(this.itemForm.value).subscribe((res: any) => {
      console.log(res);
      this.itemGet();
      this.itemForm.reset();
      this.toast.success({ detail: "Success", summary: res.message });
    },
      err => {
        this.toast.success({ detail: "Success", summary: err.message });

      })
  }
  categoryGet() {
    this.item.getCategory().subscribe((res: any) => {
      console.log('Category', res);
      this.category = res;
      // this.convertToExcel(res);
    })

  }
  convertToExcelCategory() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.category);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelBlob, 'CategoryMemo.xlsx');
  }
  convertToExcelSubcat() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.subcategory);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelBlob, 'SubcategoryMemo.xlsx');
  }
  convertToExcelUnit() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.units);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelBlob, 'UnitMemo.xlsx');
  }

  itemGet() {
    this.item.getItem().subscribe((res: any) => {
      console.log('Item', res);
      this.items = res;
      this.mainItem = res;
      this.isChecked = true;
      this.items = res.filter((fil: any) => {
        if (fil.isActive) {
          return fil
        }
      })
      if (this.items.length < 1 || this.items == undefined || this.items == null) {
        this.isData = false;
      }
    })
  }
  filtredIsActive() {
    this.isChecked = !this.isChecked;
    console.log('cc', this.isChecked)
    this.items = this.mainItem;
    let filData = this.items.filter((isFil: any) => {
      if (isFil.isActive === this.isChecked) {
        return isFil
      }
    })
    this.items = filData;
    if (this.items.length < 1 || this.items == undefined || this.items == null) {
      this.isData = false;
    }
    else {
      this.isData = true;
    }
    console.log(this.items)
  }
  subcategoryGet() {
    this.item.getSubcategory().subscribe((res: any) => {
      console.log('Subcategory', res);
      this.subcategory = res;
    })
  }
  unitGet() {
    this.item.getUnits().subscribe((res: any) => {
      console.log('Units', res);
      this.units = res;
    })
  }
  get TransactionItems(): FormArray {
    return this.itemForm.get("TransactionItems") as FormArray
  }
  transactionGet() {
    this.item.getTrasaction().subscribe((res: any) => {
      console.log(res);
      this.transation = res;
      this.transation.forEach((tra: any) => {
        this.TransactionItems.push(this.fb.group({
          transactionId: tra.transactionId,
          transactionItemId: 0,
          itemId: 0,
          transactionItemCost: 0
        })
        )
      });
    })
  }
  sectionGet() {
    this.item.getSection().subscribe((res: any) => {
      console.log('Section', res);
      this.section = res;
      this.section.forEach((sec: any) => {
        this.SectionItemRates.push(this.fb.group({
          sectionRateId: 0,
          sectionId: sec.sectionId,
          itemId: 0,
          itemRate: 0
        })
        )
      });
    })
  }
  taxGet() {
    this.item.getTax().subscribe((res: any) => {
      console.log('Tax', res);
      this.tax = res;
      this.tax.forEach((tax: any) => {
        this.taxItems.push(this.fb.group({
          itemTaxId: 0,
          itemId: 0,
          taxId: tax.taxId,
          isActive: false,
        })
        )
      });
    })
  }
  ItemPost() {
    const formArrayValues = this.itemForm.value;

    this.TaxItems = formArrayValues.taxItems.filter((x: any) => x.isActive)
    console.log(this.TaxItems)
    let datTp = {
      itemId: formArrayValues.itemId,
      categoryId: formArrayValues.categoryId,
      subcategoryId: formArrayValues.subcategoryId,
      unitId: formArrayValues.unitId,
      item_name: formArrayValues.item_name,
      // categoryName: formArrayValues.categoryName,
      // subcategoryName: formArrayValues.subcategoryName,
      UnitName: formArrayValues.UnitName,
      barCode: formArrayValues.barCode,
      hsnCode: formArrayValues.hsnCode,
      salePrice: formArrayValues.salePrice,
      taxRate: formArrayValues.taxRate,
      discount_percentage: formArrayValues.discount_percentage,
      TransactionItems: formArrayValues.TransactionItems,
      SectionItemRates: formArrayValues.SectionItemRates,
      TaxItems: formArrayValues.taxItems
    }
    console.log(datTp);
    this.item.postItem(datTp).subscribe((res: any) => {
      console.log(res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.itemGet();
      this.itemForm.reset();
    })
  }
}
