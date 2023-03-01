import { Component, Input } from '@angular/core';
import { Festival } from 'src/app/models/festivals';

@Component({
  selector: 'app-festivals-list',
  templateUrl: './festivals-list.component.html',
  styleUrls: ['./festivals-list.component.css']
})
export class FestivalsListComponent {
  @Input() festivals! : Festival[];
  festivalSelected?: Festival = undefined;

  updateFestival(festival: Festival): void {
    this.festivalSelected = festival
  }

  constructor() {
  }

  select(festival: Festival) :void {
    this.festivalSelected = festival;
  }

}
