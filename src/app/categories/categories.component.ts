import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CustomButtonComponent } from '../custom-button/custom-button.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule , CustomButtonComponent],
  providers: [NgModel],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  newCategoryName: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  addCategory(): void {
    if (this.newCategoryName.trim().length > 0) {
      this.categoryService.addCategory(this.newCategoryName).then(() => {
        this.newCategoryName = '';
        this.loadCategories();
      });
    }
  }

  editCategory(categoryId: string, currentName: string): void {
    const newName = prompt('Введите новое название категории:', currentName);
    if (newName && newName.trim().length > 0) {
      this.categoryService.updateCategory(categoryId, newName).then(() => {
        this.loadCategories();
      });
    }
  }

}
