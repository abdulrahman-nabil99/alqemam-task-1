import { Directive, ElementRef, HostListener,  Input } from '@angular/core';
import { Patterns } from '../_enum/patterns';

@Directive({
  selector: '[appCustom]'
})
export class CustomDirective {
  @Input({required:true}) patternKey!:Patterns

  private specialKeys:string[] = ["Backspace","Tab","Enter","Shift","Control","Alt","CapsLock","Delete","ArrowLeft","ArrowUp","ArrowRight","ArrowDown"]

  private patterns:{key:number,reg:RegExp}[] = 
  [
    {key:Patterns.ALPHANUMERIC,reg:/^[a-zA-Z0-9أ-ي ]$/},
    {key:Patterns.ONLY_LETTERS,reg:/^[\wأ-ي!-\/:-@[-`{-~ ]$/},
    {key:Patterns.ONLY_ARABIC,reg:/^[أ-ي]$/},
  ]
  private cleanPattern:{key:number,reg:RegExp}[] = 
  [
    {key:Patterns.ALPHANUMERIC,reg:/[^a-zA-Z0-9أ-ي ]/g},
    {key:Patterns.ONLY_LETTERS,reg:/[\d]/g},
    {key:Patterns.ONLY_ARABIC,reg:/[^أ-ي]/g},
  ]

  constructor(private el:ElementRef) { }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (this.specialKeys.includes(key))
      return;
    const pattern = this.patterns.find(p=>p.key == this.patternKey)!
    if (!pattern.reg.test(key) /*|| (key ==="." && this.el.nativeElement.value.includes("."))*/) {
      event.preventDefault(); 
    }
  }
  // For Pasting Cleans Data
  @HostListener('input') onInput(){
    const cleanPattern = this.cleanPattern.find(p=>p.key == this.patternKey)!
    this.el.nativeElement.value = this.el.nativeElement.value.replace(cleanPattern.reg,"")
  }
}
