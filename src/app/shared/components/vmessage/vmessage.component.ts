import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ap-vmessage',
  templateUrl: './vmessage.component.html'
})
export class VmessageComponent {

    @Input() text = '';
 }
