import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service'; 
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ FormsModule ],
  providers: [NgModel],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  newCategoryName: string = '';

  constructor(private categoryService: CategoryService) {}

  addCategory(): void {
    if (this.newCategoryName.trim().length > 0) {
      this.categoryService.addCategory(this.newCategoryName).then(() => {
        this.newCategoryName = '';
      });
    }
  }
}
