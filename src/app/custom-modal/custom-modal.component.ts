import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss'],
})
export class CustomModalComponent {
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  public showModal: boolean = false;

  constructor() {}

  public openModal(): void {
    this.showModal = true;
  }

  public onClose(): void {
    this.closeModal.emit();
  }
}
