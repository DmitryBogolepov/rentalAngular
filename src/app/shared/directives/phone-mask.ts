import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[phoneMask]',
  standalone: true
})
export class PhoneMaskDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');

    if (value.startsWith('7') || value.startsWith('8')) {
      value = value.substring(1);
    }

    value = value.substring(0, 10);
    let formattedValue = '';

    if (value.length > 0) {
      formattedValue = '+7 ';
      if (value.length > 0) {
        formattedValue += '(' + value.substring(0, 3);
        if (value.length >= 4) {
          formattedValue += ') ' + value.substring(3, 6);
        }
        if (value.length >= 7) {
          formattedValue += '-' + value.substring(6, 8);
        }
        if (value.length >= 9) {
          formattedValue += '-' + value.substring(8, 10);
        }
      }
    }

    this.renderer.setProperty(input, 'value', formattedValue);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' || event.key === 'Delete') {
      let value = input.value.replace(/\D/g, '');

      if (value.length > 0) {
        value = value.slice(0, -1);
        if (value.startsWith('7')) {
          value = value.substring(1);
        }
        value = value.substring(0, 10);

        setTimeout(() => {
          let newValue = '+7 ';
          if (value.length > 0) {
            newValue += '(' + value.substring(0, 3);
            if (value.length >= 4) {
              newValue += ') ' + value.substring(3, 6);
            }
            if (value.length >= 7) {
              newValue += '-' + value.substring(6, 8);
            }
            if (value.length >= 9) {
              newValue += '-' + value.substring(8, 10);
            }
          }
          this.renderer.setProperty(input, 'value', newValue);
        }, 0);
      }
    }
  }
}
