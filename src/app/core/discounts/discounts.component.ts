import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormRecord } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SubCategoryService } from 'src/app/shared/services/subcategory.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent {
  searchText:any;
  discount: any;
discountForm!:FormGroup;
isChecked: boolean = true;
isData: boolean = true;
isStatusUpdate: boolean = true;
  mainDiscount: any;
  constructor(private dis:SubCategoryService,private fb:FormBuilder,private toast: NgToastService){}
  ngOnInit():void{
    this.discountGet();
    this.discountForm=this.fb.group({
      discountId: new FormControl(),
      discountPercentage: new FormControl(),
      discountCategory: new FormControl(),
      isactive: new FormControl(true)
    })
  }
  filtredIsActive() {
    this.isChecked = !this.isChecked;
    console.log('cc', this.isChecked)
    this.discount = this.mainDiscount;
    let filData = this.discount.filter((isFil: any) => {
      if (isFil.isactive === this.isChecked) {
        return isFil
      }
    })
    this.discount = filData;
    if (this.discount.length < 1 || this.discount == undefined || this.discount == null) {
      this.isData = false;
    }
    else {
      this.isData = true;
    }
    console.log(this.discount)
  }
  discountPost(){
    console.log(this.discountForm.value);
    this.dis.postDiscount(this.discountForm.value).subscribe((res:any)=>{
      console.log(res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.discountGet();
      this.discountForm.reset();
    })
  }
  patchDiscount(value:any){
    this.discountForm.patchValue({
      discountId: value.discountId,
      discountPercentage: value.discountPercentage,
      discountCategory: value.discountCategory,
      isactive:  value.isactive
    })
  }
  StatusUpdate(value: any) {
    let dd = !value.isactive;
    console.log('st', dd)
    
    let statusdata = {
      discountId: value.discountId,
      discountPercentage: value.discountPercentage,
      discountCategory: value.discountCategory,
      isactive: dd
    }
    this.dis.updateSatusShift(statusdata).subscribe((res: any) => {
      console.log('statusUpdate', res);
      this.toast.success({ detail: "Success", summary: res.message });
      this.discountGet();
    })
  }
  discountGet(){
    this.dis.getDiscount().subscribe((res:any)=>{
      console.log('discount',res);
      this.mainDiscount = res;
      this.isChecked = true;
      this.discount = res.filter((fil: any) => {
        if (fil.isactive) {
          return fil
        }
      })
      if (this.discount.length < 1 || this.discount == undefined || this.discount == null) {
        this.isData = false;
      }
    })
  }
}
