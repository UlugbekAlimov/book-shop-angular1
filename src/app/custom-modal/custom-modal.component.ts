import { Component, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss'],
})
export class CustomModalComponent {
  @Input() title: string = ''; 
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
