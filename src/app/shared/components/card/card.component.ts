import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ap-card',
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() title: string = '';
}
