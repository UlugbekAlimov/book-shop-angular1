import { Component, Output, EventEmitter , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../custom-button/custom-button.component';
import { BookService } from '../../services/book.service';
// import { Book } from '../../models/book.model';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomButtonComponent  ],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  categories: any[] = [];
  @Output() bookAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private bookService: BookService, private categoryService: CategoryService) {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  Submit(): void {
    if (this.bookForm.valid) {
      const newBook = this.bookForm.value;
      this.bookService.addBook(newBook).then(() => {
        this.bookAdded.emit();
        this.bookForm.reset();
      });
    }
  }
}