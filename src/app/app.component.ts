import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { OnlyArabicDirective } from './_directives/only-arabic.directive';
import { AlphanumericDirective } from './_directives/alphanumeric.directive';
import { LettersOnlyDirective } from './_directives/letters-only.directive';
import { CustomDirective } from './_directives/custom.directive';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule,
    CustomDirective,
    // OnlyArabicDirective,
    // AlphanumericDirective,
    // LettersOnlyDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-1';
  allowed:RegExp = /[\w ]$/
  disAllowed:RegExp = /[^\w ]/g
  allowedDecimal:RegExp = /[.0-9]$/
  disAllowedDecimal:RegExp = /[^0-9.]/g


}
