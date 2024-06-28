import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service'; 
import { FormsModule, NgModel } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ FormsModule ],
  providers: [NgModel],
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.scss'
})
export class DeleteCategoryComponent {
  @Input() category: any; 
  constructor(private categoryService: CategoryService) {}

  deleteCategory(categoryId: string): void {
    if (confirm('Вы уверены, что хотите удалить эту категорию?')) {
      this.categoryService.deleteCategory(categoryId).then(() => {
        
      });
    }
  }
}
