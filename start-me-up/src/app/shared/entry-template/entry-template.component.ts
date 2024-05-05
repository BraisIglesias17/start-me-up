import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-entry-template',
  templateUrl: './entry-template.component.html',
  styleUrls: ['./entry-template.component.scss'],
})
export class EntryTemplateComponent {
  @Input() label: string | null = '';
  @Input() content: string | number | null = '';
  @Input() icon: string | null = '';
}
