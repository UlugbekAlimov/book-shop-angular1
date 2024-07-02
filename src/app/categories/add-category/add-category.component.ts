import { Component, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule],
  providers: [NgModel],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  newCategoryName: string = '';
  @Output() categoryAdded = new EventEmitter<void>();

  constructor(private categoryService: CategoryService, private snackBar: MatSnackBar) {}

  addCategory(): void {
    if (this.newCategoryName.trim().length > 0) {
      this.categoryService.addCategory(this.newCategoryName).then(() => {
        this.newCategoryName = '';
        this.categoryAdded.emit();
      });
    } else {
      this.snackBar.open('Поле названия категории не может быть пустым', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }
  }
}
