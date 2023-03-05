import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Jeu } from 'src/app/models/jeu';
import { EditorService } from 'src/app/services/editor.service';
import { JeuxService } from 'src/app/services/jeux.service';

@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.component.html',
  styleUrls: ['./jeux.component.css']
})
export class JeuxComponent {
  @Input() jeu: Jeu | undefined;
  @Output() emitUpdateJeu = new EventEmitter<Jeu>();
  @Output() emitDeleteJeu = new EventEmitter<Jeu>();
  @Input() readonly: boolean = false;

  public jeuGroup!: FormGroup;
  constructor(public jeuService: JeuxService, public editorservice: EditorService, public fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  updateFormFromJeu() {
    if (this.jeu) {
      this.jeuGroup = this.fb.group({
        name: [this.jeu.nom, [Validators.required, Validators.minLength(5)]],
        type: [this.jeu.type, [Validators.required]],
        agemin: [this.jeu.age_min, [Validators.required]],
        agemax: [this.jeu.age_max, [Validators.required]],
      })
    }

  }

  ngOnChanges() {
    this.updateFormFromJeu()
  }




  validate(): void {
    if (this.jeu) {
      this.jeu.nom = (this.jeuGroup.get('name')?.value == null) ? this.jeu.nom : this.jeuGroup.get('name')?.value
      this.jeu.type = (this.jeuGroup.get('type')?.value == null) ? this.jeu.type : this.jeuGroup.get('type')?.value
      this.jeu.age_min = (this.jeuGroup.get('agemin')?.value == null) ? this.jeu.age_min : this.jeuGroup.get('agemin')?.value
      this.jeu.age_max = (this.jeuGroup.get('agemax')?.value == null) ? this.jeu.age_max : this.jeuGroup.get('agemax')?.value

      console.log("HIHIH")

      this.emitUpdateJeu.emit(this.jeu)

      this.updateFormFromJeu()
    }

  }

  delete(): void {
    console.log('h')
    this.emitDeleteJeu.emit(this.jeu)
  }
}
