import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../custom-button/custom-button.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomButtonComponent],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnChanges {
  bookForm: FormGroup;
  @Input() book!: Book;
  @Output() bookEdited = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.book) {
      this.bookForm.patchValue(this.book);
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const updatedBook: Book = { ...this.book, ...this.bookForm.value };
      this.bookService.updateBook(updatedBook).then(() => {
        this.bookEdited.emit();
      });
    }
  }
}
