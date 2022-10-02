import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  onToggleDarkMode() {
    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  }
}
