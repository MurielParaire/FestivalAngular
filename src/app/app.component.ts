import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Festival } from './models/festivals';
import { FestivaljsonService } from './services/festivaljson.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FestivalApp';
  festivals!: Observable<Festival[]>;

  constructor( private festivalJson : FestivaljsonService){}

  ngOnInit() {
    this.festivals = this.festivalJson.getFestivals()
  }

  select(festival: Festival) :void {
    this.festivalSelected = festival;
  }

  festivalSelected?: Festival = undefined;

  updateFestival(festival: Festival): void {
    this.festivalSelected = festival
  }
}
