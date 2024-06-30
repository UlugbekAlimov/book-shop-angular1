import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';
import { CustomButtonComponent } from '../custom-button/custom-button.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    AddBookComponent,
    EditBookComponent,
    DeleteBookComponent,
    CustomModalComponent,
    CustomButtonComponent
  ],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  showModal = false;
  selectedBook?: Book;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getAllBooks().subscribe((books) => (this.books = books));
  }

  openModal(book?: Book): void {
    this.showModal = true;
    this.selectedBook = book;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedBook = undefined;
  }

  onBookChange(): void {
    this.getBooks();
    this.closeModal();
  }
}
