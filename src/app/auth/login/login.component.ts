import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted:any = false;
  hidePassword:any=false;
  lastDigits:any;
  mobile:any;
  timeUp:Boolean=true;
  display: any;
  public timerInterval: any;
  interval:any;
  timeLeft:number = 90;
  showPassword=false;

  constructor(private http:HttpClient,private authService:AuthService,public router:Router, public formBuilder:FormBuilder,private toast:NgToastService) {
    this.loginForm = formBuilder.group({
      login_id: new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    })
   }
  ngOnInit(): void {    
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  } 
  showHidePassword(){
    this.showPassword=!this.showPassword
  }
  onSubmit(){
   this.submitted = true;
   if(this.loginForm.valid){
    console.log(this.loginForm.value)
    this.authService.authUser(this.loginForm.value).subscribe((res:any)=>{
    console.log('mobile response',res);
    if(res.status){
      this.router.navigate(['/dashboard']);        
      this.toast.success({ detail: "SUCCESS", summary: 'Login successful..!'});
      const token:any = JSON.stringify(res.id);
      const user:any = JSON.stringify(res);

      localStorage.setItem('token',token);
      localStorage.setItem('user',user);

    }
    else{
      this.toast.error({ detail: "Oops..!", summary: res.message });

    }
  
    },
    errRes=> {
      this.showerror();
      console.log('error',errRes)
    });   
    return
   }
  }
  showSuccess() {
    this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
  }
  showerror() {

    this.toast.error({ detail: "Oops..!", summary: 'Somethng went wrong..!' });
  }
}
