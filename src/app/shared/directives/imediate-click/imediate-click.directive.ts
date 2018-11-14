import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlatformDetectorService } from '../../../core/platform-detector/platform-detector.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[immediateClick]'
})
export class ImediateClickDirective implements OnInit {

  constructor(
    private element: ElementRef<any>,
    private platformDetector: PlatformDetectorService) { }

  ngOnInit(): void {
    // tslint:disable-next-line:no-unused-expression
    this.platformDetector.ehPlataformaBrowser &&
      this.element.nativeElement.click();

  }
}
