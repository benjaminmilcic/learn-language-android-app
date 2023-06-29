import { Component } from '@angular/core';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss'],
})
export class CategoriesPage {
  wordlistMode: 'categories' | 'custom' = 'categories';

  constructor(
    public categoryService: CategoryService
  ) {}
}
