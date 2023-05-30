import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  constructor(public categoryService: CategoryService) {}
}
