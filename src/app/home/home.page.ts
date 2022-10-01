import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() { }
  
  onToggleDarkMode() {
    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  }
}
