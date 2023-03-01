import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Festival } from 'src/app/models/festivals';
import { AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.css']
})

export class FestivalDetailsComponent {
  @Input() festival! : Festival
  @Output() emitUpdatedFestival = new EventEmitter<Festival>();

  public festivalGroup! : FormGroup

  constructor(public fb: FormBuilder) {}

  ngOnChanges(){
    this.festivalGroup = this.fb.group({
      name: [this.festival.name, [Validators.required, Validators.minLength(5)]],
      tablesEntree: [this.festival.tablemax_1, [Validators.required]],
      entrancePrice: [this.festival.tableprice_1, [Validators.required, Validators.min(50)]]
    })
  }

  


  validate(): void {
    this.festival.name = (this.festivalGroup.get('name')?.value == null) ? this.festival.name : this.festivalGroup.get('name')?.value
    this.festival.tablemax_1 = (this.festivalGroup.get('tablesEntree')?.value == null) ? this.festival.tablemax_1 : this.festivalGroup.get('tablesEntree')?.value
    this.festival.tableprice_1 = (this.festivalGroup.get('entrancePrice')?.value == null) ? this.festival.tableprice_1 : this.festivalGroup.get('entrancePrice')?.value
    
    console.log(this.festival)

    this.emitUpdatedFestival.emit(this.festival)
  }

}
