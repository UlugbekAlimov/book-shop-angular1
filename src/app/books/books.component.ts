import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [ CommonModule , CustomButtonComponent , CustomModalComponent ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
  public showModal: boolean = false;

  constructor() {}

  public openModal(): void {
    this.showModal = true;
  }

  public closeModal(): void {
    this.showModal = false;
  }
}
