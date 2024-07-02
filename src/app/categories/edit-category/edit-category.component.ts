import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [ FormsModule ],
  providers: [NgModel],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent {
  @Input() category: any; 
  @Output() categoryEdited = new EventEmitter<void>();

  constructor(private categoryService: CategoryService) {}

  editCategory(): void {
    const newName = prompt('Введите название категории:', this.category.name);
    if (newName && newName.trim().length > 0) {
      this.categoryService.updateCategory(this.category.id, newName).then(() => {
        this.categoryEdited.emit();
      });
    }
  }
}