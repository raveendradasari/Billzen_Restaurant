import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { UserRoleService } from 'src/app/shared/services/user-role.service';

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.scss']
})
export class GreetingsComponent {
  greeting: any;
  greetingForm!: FormGroup;
  transaction: any;
  isChecked: boolean = true;
  isData: boolean = true;
  isStatusUpdate: boolean = true;
  searchText:any;
  constructor(private gree: UserRoleService, private fb: FormBuilder, private datePipe: DatePipe,private toast: NgToastService) { }
  ngOnInit(): void {
    this.greetingGet();
    this.transactionGet();
    this.greetingForm = this.fb.group({
      greeting_id: new FormControl(),
      greeting_message: new FormControl(),
      shift_start_date: new FormControl(),
      shift_start_time: new FormControl(),
      shift_end_date: new FormControl(),
      shift_end_time: new FormControl(),
      isactive: new FormControl(true),
      TransactionGreeting: this.fb.array([])
    })
    this.addTransactionGreeting();

  }
  updateShift(value: any) {
    console.log(value.TransactionGreeting)
    this.greetingForm.setControl('TransactionGreeting', this.setExistingTransaction(value.TransactionGreeting));
    console.log(this.greetingForm.setControl('TransactionGreeting', this.setExistingTransaction(value.TransactionGreeting)))
    const start = value.shift_start_date;
    const end = value.shift_end_date;
    const formattedDateStart = this.datePipe.transform(start, 'yyyy-MM-dd');
    const formattedDateEndt = this.datePipe.transform(end, 'yyyy-MM-dd');
    this.greetingForm.patchValue({
      greeting_id: value.greeting_id,
      greeting_message: value.greeting_message,
      shift_start_date: formattedDateStart,
      shift_end_date: formattedDateEndt,
      shift_start_time: value.shift_start_time,
      shift_end_time: value.shift_start_time,
      isactive: value.isactive
    })

  }
  setExistingTransaction(tra: any): FormArray {
    const formArray: any = new FormArray([]);
    tra.forEach((element: any) => {
      formArray.push(this.fb.group({
        transactionGreetingId: element.transactionGreetingId,
        greeting_id: element.greeting_id,
        transactionId: element.transactionId,
        transactionName: element.transactionName,
        isactive: element.isactive
      }))
    });
    return formArray;
  }
  get TransactionGreeting(): FormArray {
    return this.greetingForm.get('TransactionGreeting') as FormArray
  }
  addTransactionGreeting() {
    this.TransactionGreeting.push(this.fb.group({
      transactionGreetingId: new FormControl(),
      greeting_id: new FormControl(),
      transactionId: new FormControl(),
      transactionName: new FormControl(),
      isactive: new FormControl(true)
    }))
  }
  transactionGet() {
    this.gree.getTrasaction().subscribe((res: any) => {
      console.log('Transaction', res);
      this.transaction = res;
    })
  }
  greetingGet() {
    this.gree.getGreeting().subscribe((res: any) => {
      console.log('Greeting', res);
      this.greeting = res;
    })
  }
  greetingPost() {
    console.log(this.greetingForm.value);
    this.gree.postGreeting(this.greetingForm.value).subscribe((res: any) => {
      console.log(res);
      this.greetingGet();
      this.greetingForm.reset();
      this.toast.success({ detail: "Success", summary: res.message });

    })
  }
}
