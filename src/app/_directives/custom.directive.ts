import { Directive, ElementRef, HostListener,  Input } from '@angular/core';
import { Patterns } from '../_enum/patterns';

@Directive({
  selector: '[appCustom]'
})
export class CustomDirective {
  @Input({required:true}) patternKey!:Patterns

  private specialKeys:string[] = ["Backspace","Tab","Enter","Shift","Control","Alt","CapsLock","Delete","ArrowLeft","ArrowUp","ArrowRight","ArrowDown"]

  private patterns:{key:number,pattern:RegExp,cleanPttern:RegExp}[] = 
  [
    {key:Patterns.ALPHANUMERIC, pattern:/^[a-zA-Z0-9أ-ي ]$/, cleanPttern:/[^a-zA-Z0-9أ-ي ]/g},
    {key:Patterns.ONLY_LETTERS, pattern:/^[\wأ-ي!-\/:-@[-`{-~ ]$/, cleanPttern:/[\d]/g},
    {key:Patterns.ONLY_ARABIC, pattern:/^[أ-ي]$/, cleanPttern:/[^أ-ي]/g},
  ]

  constructor(private el:ElementRef) { }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (this.specialKeys.includes(key))
      return;
    const pattern = this.patterns.find(p=>p.key == this.patternKey)!
    if (!pattern.pattern.test(key) /*|| (key ==="." && this.el.nativeElement.value.includes("."))*/) {
      event.preventDefault(); 
    }
  }
  // For Pasting Cleans Data
  @HostListener('input') onInput(){
    const pattern = this.patterns.find(p=>p.key == this.patternKey)!
    this.el.nativeElement.value = this.el.nativeElement.value.replace(pattern.cleanPttern,"")
  }
}
