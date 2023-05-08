import { Component } from '@angular/core';

import { Category } from '../Category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchBorderColor: string = "transparent";

  searchFocus(): void {
    this.searchBorderColor = "#f5cf3d";
  }
  searchBlur(): void {
    this.searchBorderColor = "transparent";
  }
}
