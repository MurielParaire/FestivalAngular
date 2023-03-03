import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Festival } from 'src/app/models/festivals';
import { FestivaljsonService } from 'src/app/services/festivaljson.service';

@Component({
  selector: 'app-festivals-list',
  templateUrl: './festivals-list.component.html',
  styleUrls: ['./festivals-list.component.css']
})
export class FestivalsListComponent {
  @Input() festivals : Festival[] | null | undefined;
  @Output() emitUpdatedFestival = new EventEmitter<Festival>();
  festivalSelected?: Festival = undefined;

  updateFestival(festival: Festival): void {
    this.festivalSelected = festival
  }

  constructor(private route : ActivatedRoute, private festivalService : FestivaljsonService) {
  }


  select(festival: Festival) :void {
    this.festivalSelected = festival;
    this.emitUpdatedFestival.emit(this.festivalSelected)
  }

  

}
