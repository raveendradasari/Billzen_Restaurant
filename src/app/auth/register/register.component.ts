import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router'
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private router: Router,private toast:NgToastService) { }
  submitted = false;
  registerForm!: FormGroup;
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return
    }
    console.log(JSON.stringify(this.registerForm.value))
   

  }
}
