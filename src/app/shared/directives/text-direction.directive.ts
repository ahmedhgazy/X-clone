import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { getTextDirection } from '../utilities/text-direction';
@Directive({
  selector: '[appTextDirection]',
  standalone: true,
})
export class TextDirectionDirective implements OnChanges {
  @Input() appTextDirection: string;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    const direction = getTextDirection(this.appTextDirection);
    this.el.nativeElement.style.direction = direction;
    this.el.nativeElement.style.unicodeBidi = 'plaintext';
  }
}
