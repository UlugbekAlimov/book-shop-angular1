import { Component , Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [NgClass ],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {
  @Input() type: 'info' | 'danger' | 'success' = 'info';
}
