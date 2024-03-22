import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  router: any;
  private formSubmitAttempt : boolean | undefined
  form: any;

  constructor(private fb: FormBuilder, router: Router,private authService: AuthService,) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(3)]],
      password: ['', Validators.required]
    });
  }
   

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field)?.valid && this.loginForm.get(field)?.touched) ||
      (this.loginForm.get(field)?.untouched && this.formSubmitAttempt)
    );
  }
  
  

  
    onSubmit(): void {
      if (this.loginForm.valid) {
        const usernameControl = this.loginForm.get('username');
        const passwordControl = this.loginForm.get('password');
    
        if (usernameControl && passwordControl && usernameControl.value && passwordControl.value) {
          const username = usernameControl.value;
          const password = passwordControl.value;

        this.authService.login(username, password).subscribe(
          response => {
            // const department = response['Department'];
            // sessionStorage.setItem('department', department);
            
            // this.navigateToDepartmentPage(department);
            
            console.log('Login successful:',response);
          },
          error => {
            // Handle login error
            console.error('Login error:',error);
          }
        );
      }
    // this.formSubmitAttempt = true;
    // if (this.loginForm.valid) {
    //   console.log(this.loginForm.value); // Handle form submission
    // }
  }
  
  
}

navigateToDepartmentPage(department: string): void {
  // Determine which page to navigate based on the department value
  switch(department) {
    case 'Finance':
      this.router.navigate(['/dashboard']);
      break;
    case 'Human Resources':
      // Navigate to HR page
      break;
    // Add cases for other departments as needed
    default:
      this.router.navigate(['/404']);// Handle default case or error
      break;
  }
}
  
  OnClick(){
    this.router.navigate(['/register']);
  }
}
