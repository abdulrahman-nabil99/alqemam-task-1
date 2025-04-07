import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLettersOnly]'
})
export class LettersOnlyDirective {
  private allowedKeysRegex: RegExp = /^[\wأ-ي!-\/:-@[-`{-~ ]$/;
  private specialKeys:string[] = ["Backspace","Tab","Enter","Shift","Control","Alt","CapsLock","Escape","Delete","ArrowLeft","ArrowUp","ArrowRight","ArrowDown"]
  constructor(private el:ElementRef) { }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (this.specialKeys.includes(key)) return;
    if (!this.allowedKeysRegex.test(key)) {
      event.preventDefault(); 
    }
  }
  @HostListener('input') onInput(){
    this.el.nativeElement.value = this.el.nativeElement.value.replace(/[\d]/g,"")
  }
}
