import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AddBookComponent } from './add-book/add-book.component';
// import { EditBookComponent } from './edit-book/edit-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { CategoryService } from '../services/category.service';
import { BookModalComponent } from './book-modal/book-modal.component';
@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    // AddBookComponent,
    // EditBookComponent,
    DeleteBookComponent,
    CustomModalComponent,
    CustomButtonComponent,
    BookModalComponent
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
  loading = false; 
  modalTitle: string = '';

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
  }

  loadBooks(): void {
    this.loading = true; 
    this.bookService.getAllBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
        this.loading = false; 
      },
      error => {
        console.error('Ошибка:', error);
        this.loading = false; 
      }
    );
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
    if (book) {
      this.selectedBook = book;
      this.modalTitle = 'Изменить книгу';
    } else {
      this.selectedBook = null;
      this.modalTitle = 'Добавить книгу';
    }
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
