import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphanumeric]'
})
export class AlphanumericDirective {
  private allowedKeysRegex: RegExp = /^[a-zA-Z0-9أ-ي ]$/;
  private specialKeys:string[] = ["Backspace","Tab","Enter","Shift","Control","Alt","CapsLock","Escape","Delete","ArrowLeft","ArrowUp","ArrowRight","ArrowDown"]
  constructor(private el:ElementRef) { }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (this.specialKeys.includes(key))
      return;
    if (!this.allowedKeysRegex.test(key)) {
      event.preventDefault(); 
    }
  }
  @HostListener('input') onInput(){
    this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^a-zA-Z0-9أ-ي ]/g,"")
  }

}
