import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent, CustomModalComponent],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  public showModal: boolean = false;
  public books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getAllBooks().subscribe(books => {
      this.books = books;
    });
  }

  public openModal(): void {
    this.showModal = true;
  }

  public closeModal(): void {
    this.showModal = false;
  }
}
