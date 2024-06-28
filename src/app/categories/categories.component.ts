import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
// import { DeleteCategoryComponent } from './delete-category/delete-category.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CustomButtonComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    // DeleteCategoryComponent,
  ],
  providers: [NgModel],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  newCategoryName: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  deleteCategory(categoryId: string): void {
    if (confirm('Вы уверены, что хотите удалить эту категорию?')) {
      this.categoryService.deleteCategory(categoryId).then(() => {
        this.loadCategories();
      });
    }
  }
}
