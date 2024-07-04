import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../custom-button/custom-button.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomButtonComponent],
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent implements OnChanges, OnInit {
  bookForm: FormGroup;
  categories: any[] = [];
  @Input() book: Book | null = null;
  @Input() selectedCategory: string | null = null;
  @Output() bookSaved = new EventEmitter<void>();
  EditMode = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private categoryService: CategoryService
  ) {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['book'] && this.book) {
      this.EditMode = true;
      this.bookForm.patchValue(this.book);
    } else if (changes['selectedCategory'] && this.selectedCategory) {
      this.bookForm.patchValue({ categoryId: this.selectedCategory });
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  Submit(): void {
    this.bookForm.markAllAsTouched();
    if (this.bookForm.valid) {
      if (this.EditMode) {
        const updatedBook: Book = { ...this.book, ...this.bookForm.value };
        this.bookService.updateBook(updatedBook).then(() => {
          this.bookSaved.emit();
        });
      } else {
        const newBook = this.bookForm.value;
        this.bookService.addBook(newBook).then(() => {
          this.bookSaved.emit();
          this.bookForm.reset({
            name: '',
            description: '',
            price: 0,
            categoryId: ''
          });
        });
      }
    }
  }
}
