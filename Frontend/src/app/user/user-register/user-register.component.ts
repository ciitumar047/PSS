import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, ValidationErrors, Validators, FormBuilder } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm: FormGroup;
  user: User;
  userSubmitted: boolean = false;
  constructor( private fb:FormBuilder,private userService:UserServiceService) {
    this.registrationForm = new FormGroup({
      userName: new FormControl(),
    });
    this.user = {} as User;
  }

  ngOnInit() {
    // this.registrationForm = new FormGroup({
    //   userName: new FormControl('Mark', Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null, [Validators.required]),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    // }, { validators: this.passwordMatchingValidator });
    this.createRegisterationForm();
  }

createRegisterationForm(){
  this.registrationForm=this.fb.group({
   userName:[null,Validators.required],
   email:[null,[Validators.required,Validators.email]],
   password:[null,[Validators.required,Validators.maxLength(8)]],
   confirmPassword:[null,Validators.required],
   mobile:[null,[Validators.required,Validators.maxLength(10)]]
  },{validators:this.passwordMatchingValidator})
}

  passwordMatchingValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notmatched: true };
  }

get userName(){
  return this.registrationForm.get('userName') as FormControl;
}

get email(){
  return this.registrationForm.get('email') as FormControl;
}
get password(){
  return this.registrationForm.get('password') as FormControl;
}
get confirmPassword(){
  return this.registrationForm.get('confirmPassword') as FormControl;
}
get mobile(){
  return this.registrationForm.get('mobile') as FormControl;
}
onSubmit() {
  debugger
  console.log(this.registrationForm.value);
  this.userSubmitted=true;
  //if(this.registrationForm.valid){
   // this.user = Object.assign({}, this.user, this.registrationForm.value);
    this.userService.addUser(this.userData());
    this.registrationForm.reset();
    this.userSubmitted=false;
//  }

}

userData():User{
  return this.user={
    userName:this.userName.value,
    email:this.email.value,
    password:this.password.value,
    mobile:this.mobile.value
  }
}

}
