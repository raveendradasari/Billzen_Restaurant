import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { ItemsService } from 'src/app/shared/services/items.service';
import { SubCategoryService } from 'src/app/shared/services/subcategory.service';

@Component({
  selector: 'app-kot-print-config',
  templateUrl: './kot-print-config.component.html',
  styleUrls: ['./kot-print-config.component.scss']
})
export class KotPrintConfigComponent implements OnInit{

  checkboxarray: any;
  items: any;
  printernames:any;
  transactiontypes:any;
  subcategory:any;
  subcategoryName:string='';



  constructor(private item:ItemsService,private subcatserv:SubCategoryService) {}
  ngOnInit(): void {
    this.subcategoryGet();
    this.itemGet();
    this.getprinternames();
    this.gettransactionnames();
  }

  
  subcategoryGet() {
    this.subcatserv.getSubcategory().subscribe((res: any) => {
      this.subcategory = res;
    })
  }


  temparray:any=[];
  newarray:any=[];

  onChange(event:any){
    if(event.target.checked){
        this.temparray = this.subcategory.filter((e:any) => e.subcategoryId == event.target.value);
   
          this.items=[];
          this.newarray.push(this.temparray);
          for(let i=0; i < this.newarray.length; i++){
            var firstarray =  this.newarray[i];
            for(let i=0; i < firstarray.length;i++){
              var obj = firstarray[i];
               this.items.push(obj);
               console.log(this.items);
            }
          }
    }
    
    else{
         this.temparray = this.items.filter((e:any) => e.subcategoryId != event.target.value);
         this.newarray=[];
         this.items=[];
         this.newarray.push(this.temparray);
         for(let i=0; i < this.newarray.length; i++){
          var firstarray =  this.newarray[i];
          for(let i=0; i < firstarray.length;i++){
            var obj = firstarray[i];
             this.items.push(obj);
             console.log(this.items);
          }
          
         }
    }
  }

  
  itemGet() {
    this.item.getItem().subscribe((res: any) => {
      console.log('Item', res);
      this.items = res;
      this.subcategory=this.items;
    })
  }






  

  getprinternames(){
    this.item.getPrinter().subscribe((res: any) => {
      console.log('printer', res);
      this.printernames = res;
  })
}


gettransactionnames(){
  this.item.getTrasaction().subscribe((res:any)=>{
    this.transactiontypes=res;
  })
}


delprinter(id:number){
   this.item.deleteprinter(id).subscribe(res=>{
    alert("Are You Sure to Delete?")
    this.getprinternames();
   })
}


}
