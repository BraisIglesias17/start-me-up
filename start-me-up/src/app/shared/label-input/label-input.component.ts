import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-input',
  templateUrl: './label-input.component.html',
  styleUrls: ['./label-input.component.scss'],
})
export class LabelInputComponent {
  @Input() content: string = '';
  @Input() showError: boolean = false;
  @Input() errorMessage: string = '';
}
