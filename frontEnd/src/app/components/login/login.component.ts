import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup | undefined;
  userName: string = '';
  password: string = '';

constructor( 
  private dialogRef: MatDialogRef<LoginComponent>) {
}


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName : new FormControl(null, Validators.required),
      password : new FormControl(null, Validators.required)
    })
  }

  login() {
    this.dialogRef.close("True")
  }

}
