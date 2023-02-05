import { Component } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public dialog: MatDialog, private router: Router,) {}

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px'});

    dialogRef.afterClosed().subscribe(result => {
      if (result == "True") {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
