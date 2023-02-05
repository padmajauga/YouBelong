import { Component } from '@angular/core';
import { menu, menuData } from 'src/app/dtos/menu.dto';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  menuItems: Array<menu> = menuData

  ngOnInit(): void {
  }
}
