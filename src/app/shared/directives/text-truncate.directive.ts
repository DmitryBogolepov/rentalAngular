import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[textTruncate]',
  standalone: true
})
export class TextTruncateDirective implements OnInit, OnChanges {
  @Input() textTruncate: number = 100;
  @Input() textContent: string = '';
  @Input() truncateSuffix: string = '...';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    setTimeout(() => {
      this.truncateText();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['textContent'] && !changes['textContent'].firstChange) {
      this.truncateText();
    }
  }

  private truncateText() {
    const element = this.el.nativeElement;

    let text = element.textContent?.trim() || '';
    if (this.textContent) {
      text = this.textContent;
    }

    const maxLength = this.textTruncate || 100;
    const suffix = this.truncateSuffix || '...';

    if (text.length > maxLength) {
      const truncated = text.substring(0, maxLength) + suffix;
      this.renderer.setProperty(element, 'textContent', truncated);
    } else {
      this.renderer.setProperty(element, 'textContent', text);
    }
  }
}
