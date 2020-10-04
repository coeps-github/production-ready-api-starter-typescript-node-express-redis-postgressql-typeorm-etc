import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-angular',
  templateUrl: './my-angular.component.html',
  styleUrls: ['./my-angular.component.scss']
})
export class MyAngularComponent {
  @Input() name: string;
}
