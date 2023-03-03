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
  @Input() jeu!: Jeu;
  @Output() emitUpdatedJeu = new EventEmitter<Jeu>();
  @Output() emitNewJeu = new EventEmitter<Jeu>();
  public jeux: Jeu[] | undefined;

  public jeuGroup!: FormGroup;

  constructor(public jeuService: JeuxService, public editorservice: EditorService, public fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  updateFormFromJeu() {
    this.jeuGroup = this.fb.group({
      name: [this.jeu.nom, [Validators.required, Validators.minLength(5)]],
      type: [this.jeu.type, [Validators.required]],
      agemin: [this.jeu.age_min, [Validators.required]],
      agemax: [this.jeu.age_max, [Validators.required]],
    })
  }

  ngOnChanges() {
    this.updateFormFromJeu()
  }

  ngOnInit(): void {
    if (!(this.jeu)) {
      this.router.navigate(['events'])
    }
  }



  validate(): void {
    this.jeu.nom = (this.jeuGroup.get('name')?.value == null) ? this.jeu.nom : this.jeuGroup.get('name')?.value
    this.jeu.type = (this.jeuGroup.get('type')?.value == null) ? this.jeu.type : this.jeuGroup.get('type')?.value
    this.jeu.age_min = (this.jeuGroup.get('agemin')?.value == null) ? this.jeu.age_min : this.jeuGroup.get('agemin')?.value
    this.jeu.age_max = (this.jeuGroup.get('agemax')?.value == null) ? this.jeu.age_max : this.jeuGroup.get('agemax')?.value

    console.log(this.jeu)

    if (this.jeu.id == undefined) {
      this.emitNewJeu.emit(this.jeu)
    }
    else {
      this.emitUpdatedJeu.emit(this.jeu)
    }
    this.updateFormFromJeu()
  }

  delete(): void {
    //this.editorservice.deleteEditor(this.jeu)
    this.router.navigate(['/app'])
  }
}
