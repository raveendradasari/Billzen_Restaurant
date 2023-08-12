import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'app-settingspage',
  templateUrl: './settingspage.component.html',
  styleUrls: ['./settingspage.component.scss']
})
export class SettingspageComponent {
  idPermission: any = [];
  selectedId:any;
  allUser: any;
  updateData: any;
  isSeeting!: boolean;
  access: any;
  dynamicForm!: FormGroup;
  constructor(private fb: FormBuilder, private permission: SettingsService, private toast: NgToastService) { }
  role_id!: any;
  form!: FormGroup;
  userPermission: any = ['Shift', 'Table', 'Item', 'Catagory',
   'Dash Board', 'SubCategory', 'Discounts', 'Unit', 'Company',
    'Customer', 'Tax', 'Display Order', 'Greetings', 'Reports']
  checkboxOptions: { label: string, checked: boolean }[] = [
    { label: 'Shift', checked: false },
    { label: 'Table', checked: false },
    { label: 'Item', checked: false },
    { label: 'Catagory', checked: false },
    { label: 'Dash Board', checked: false },
    { label: 'SubCategory', checked: false },
    { label: 'Discounts', checked: false },
    { label: 'Unit', checked: false },
    { label: 'Company', checked: false },
    { label: 'Customer', checked: false },
    { label: 'Tax', checked: false },
    { label: 'Display Order', checked: false },
    { label: 'Greetings', checked: false },
    { label: 'Reports', checked: false },

  ];
 
  ngOnInit(): void {
    // this.role_id = localStorage.getItem('token')
    // this.userPermissionGet(this.role_id);
    // this.userAllGet();
    this.accessGet();
    this.dynamicForm = this.fb.group({
      dynamicDataArray: this.fb.array([])
    });
  }
  onSubmit() {
    // alert(JSON.stringify(this.form.value, null, 4));
    console.log('form', this.form.value)
    this.permission.updateUserPermission(this.form.value).subscribe((res: any) => {
      console.log('update', res)
      this.toast.success({ detail: "Success", summary: 'Permission Updated successfuly.' });

    })
  }
  accessGet() {
    this.permission.getAllUser().subscribe((res: any) => {
      console.log('user', res);
      this.access = res;
      this.populateFormWithData();
    })
  }
  onReset() {
    // this.submitted = false;
    // this.form.reset();
  }
  postAccessLevels(){
    try{

   
    this.checkboxOptions.forEach(option => {
      // Perform operations on each option
      console.log(option);
      let datatopost={
        "acess_Id": 0,
        "user_id": this.selectedId,
        "acess_name": option.label,
        "isactive": option.checked
      };
      this.permission.postAccessLevels( datatopost).subscribe((res: any) => {
        console.log(res);
       
      })
    });
    // alert('Accesss levels saved!')
    this.toast.success({ detail: "Success!", summary: 'Accesss levels saved!' });

  }
  catch{
    // alert('something went wrong!');
    this.toast.error({ detail: "Oops!", summary: 'something went wrong!' });

  }
  }
  userPermissionGet(id: any) {
    this.permission.getUserPermission(id).subscribe((res: any) => {
      if (res.length < 1) {
        this.toast.warning({ detail: "Oops..!", summary: 'Data not available.' });

      }
      else{

 
      console.log('permissionGetByIs', res);
      this.idPermission = res;
      // console.log(this.idPermission[0].settings)
      // this.isSeeting = this.idPermission[0].settings;
      // this.form = this.fb.group({

      // });
      this.idPermission.forEach((daItem: any) => {
        this.checkboxOptions.forEach((ceItem: any) => {
        if(ceItem.label==daItem.acess_name){
          ceItem.checked=daItem.isactive
        }
        });
        
      });
      }
    })
  }

  populateFormWithData() {
    const dataArray = this.access; // Assuming the API returns an array of data
    console.log('dataA', dataArray)
    const controlArray = this.dynamicForm.get('dynamicDataArray') as FormArray;

    dataArray.forEach((dataItem: any) => {
      controlArray.push(this.fb.control(dataItem)); // Add a control for each item in the array
    });
  }

  userPermissionGetDrop(id: any) {
  
    this.permission.getUserPermission(id).subscribe((res: any) => {
      if (res.length ==0) {
        
        this.toast.warning({ detail: "Oops..!", summary: 'Data not available.' });

      }
      console.log('permissionGetByIs', res);
      this.idPermission = res;


      this.idPermission.forEach((daItem: any) => {
        this.checkboxOptions.forEach((ceItem: any) => {
        if(ceItem.label==daItem.acess_name){
          ceItem.checked=daItem.isactive
        }
        });
        
      });
      // console.log(this.idPermission[0].settings)
      // this.isSeeting = this.idPermission[0].settings;
      // this.form = this.fb.group({
      //   acess_Id: [this.idPermission[0].acess_Id],
      //   role_id: [this.idPermission[0].role_id],
      //   user_id: [this.idPermission[0].user_id],
      //   dash_board: [this.idPermission[0].dash_board],
      //   item_master: [this.idPermission[0].item_master],
      //   nc_master: [this.idPermission[0].nc_master],
      //   pay_method: [this.idPermission[0].pay_method],
      //   category: [this.idPermission[0].category],
      //   bulk_table: [this.idPermission[0].bulk_table],
      //   units: [this.idPermission[0].units],
      //   settings: [this.idPermission[0].settings],
      //   user_role: [this.idPermission[0].user_role],
      //   section: [this.idPermission[0].section],
      //   company: [this.idPermission[0].company],
      //   tables: [this.idPermission[0].tables],
      //   tax: [this.idPermission[0].tax],
      //   staff: [this.idPermission[0].staff],
      //   customer: [this.idPermission[0].customer],
      //   sub_category: [this.idPermission[0].sub_category],
      // });
    })
  }
  userAllGet() {
    this.permission.getAllUser().subscribe((res: any) => {
      console.log(res);
      this.allUser = res;
    })
  }
  changeuserId(event: any) {
      this.checkboxOptions.map(option => {
           
      return option.checked=false;
    });
    console.log('id', event.target.value);
    this.selectedId=event.target.value;
    this.userPermissionGetDrop(this.selectedId);
    

  }

  // updatePermission() {
  //   console.log('form',this.form.value)
  //   this.permission.updateUserPermission(this.form.value).subscribe((res: any) => {
  //     console.log('update', res)
  //   })
  // }
}
