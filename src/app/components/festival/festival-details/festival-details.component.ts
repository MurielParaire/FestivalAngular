import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Festival } from 'src/app/models/festivals';
import { FestivalsService } from 'src/app/services/festivals.service';


@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.css']
})

export class FestivalDetailsComponent {
  @Input() festival!: Festival
  @Output() emitUpdatedFestival = new EventEmitter<Festival>();

  public festivalGroup!: FormGroup

  constructor(public fb: FormBuilder, private route: ActivatedRoute, private festivalService: FestivalsService, private router: Router) { }

  updateFormFromFestival() {
    this.festivalGroup = this.fb.group({
      name: [this.festival.name, [Validators.required, Validators.minLength(5)]],
      tablesEntree: [this.festival.tablemax_1, [Validators.required]],
      entrancePrice: [this.festival.tableprice_1, [Validators.required, Validators.min(50)]]
    })
  }


  ngOnChanges() {
    this.updateFormFromFestival()
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id != null && id != undefined && id != '0') {
        this.festivalService.getFestival(id).subscribe((fest: Festival) => {
          console.log(fest)
          this.festival = fest;
          this.updateFormFromFestival()
        })
      }
      if (id == '0') {
        this.festival = new Festival('')
        this.updateFormFromFestival()
      }
    }

  }


  validate(): void {
    this.festival.name = (this.festivalGroup.get('name')?.value == null) ? this.festival.name : this.festivalGroup.get('name')?.value
    this.festival.tablemax_1 = (this.festivalGroup.get('tablesEntree')?.value == null) ? this.festival.tablemax_1 : this.festivalGroup.get('tablesEntree')?.value
    this.festival.tableprice_1 = (this.festivalGroup.get('entrancePrice')?.value == null) ? this.festival.tableprice_1 : this.festivalGroup.get('entrancePrice')?.value

    console.log(this.festival)

    if (this.festival.id == undefined) {
      this.festivalService.addNewFestival(this.festival)
    }
    else {
      this.festivalService.addUpdateFestival(this.festival)
    }
    this.updateFormFromFestival()
    this.emitUpdatedFestival.emit(this.festival)
  }

  delete(): void {
    this.festivalService.deleteFestival(this.festival)
    this.router.navigate(['/app'])
  }

}
