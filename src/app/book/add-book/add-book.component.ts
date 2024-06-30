import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../custom-button/custom-button.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomButtonComponent],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  bookForm: FormGroup;
  @Output() bookAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;
      this.bookService.addBook(newBook).then(() => {
        this.bookAdded.emit();
        this.bookForm.reset();
      });
    }
  }
}
