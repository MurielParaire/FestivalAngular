import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Festival } from 'src/app/models/festivals';
import { FestivalsService } from 'src/app/services/festivals.service';

@Component({
  selector: 'app-festivals-list',
  templateUrl: './festivals-list.component.html',
  styleUrls: ['./festivals-list.component.css']
})
export class FestivalsListComponent implements OnInit {
  @Input() festivals: Festival[] | null | undefined;
  @Output() emitUpdatedFestival = new EventEmitter<Festival>();
  festivalSelected?: Festival = undefined;

  updateFestival(festival: Festival): void {
    this.festivalService.getAllFestivals().subscribe((fests: Festival[]) => {
      this.festivals = fests;
    })
    this.festivalSelected = festival
  }

  constructor(private route: ActivatedRoute, private festivalService: FestivalsService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path == 'festivals') {
      this.festivalService.getAllFestivals().subscribe((fests: Festival[]) => {
        this.festivals = fests;
      })
    }
  }


  select(festival: Festival): void {
    this.festivalSelected = festival;

    if (this.route.snapshot.url[0].path == 'festivals') {
      if (festival.id == undefined) {
        this.router.navigate(['festival/0'])
      }
      else {
        this.router.navigate([`festival/${festival.id}`])
      }
    }
    else {
      this.emitUpdatedFestival.emit(this.festivalSelected)
    }
  }


  create(): void {
    this.festivalSelected = new Festival('');
    this.emitUpdatedFestival.emit(this.festivalSelected)
  }


}
