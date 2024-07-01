import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { CategoryService } from '../services/category.service';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    AddBookComponent,
    EditBookComponent,
    DeleteBookComponent,
    CustomModalComponent,
    CustomButtonComponent,
  ],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  categories: any[] = [];
  selectedCategory: string = 'all';
  selectedCategoryId: string | null = null;
  showModal: boolean = false;
  selectedBook: Book | null = null;

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe((books) => {
      this.books = books;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  CategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategoryId = target.value || null;
    this.Filter();
  }

  Filter(): void {
    if (this.selectedCategoryId) {
      this.bookService
        .getBooksByCategory(this.selectedCategoryId)
        .subscribe((books) => {
          this.books = books;
        });
    } else {
      this.loadBooks();
    }
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'error e';
  }

  openModal(book?: Book): void {
    this.selectedBook = book ? { ...book } : null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedBook = null;
  }

  BookChange(): void {
    this.loadBooks();
    this.closeModal();
  }
}
