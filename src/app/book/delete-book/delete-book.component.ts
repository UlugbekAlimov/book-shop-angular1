import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../custom-button/custom-button.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent],
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent {
  @Input() book!: Book;
  @Output() bookDeleted = new EventEmitter<void>();

  constructor(private bookService: BookService) {}

  Delete(): void {
    if (this.book && this.book.id) {
      this.bookService.deleteBook(this.book.id).then(() => {
        this.bookDeleted.emit();
      });
    }
  }
}
