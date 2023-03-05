import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Jeu } from 'src/app/models/jeu';
import { EditorService } from 'src/app/services/editor.service';
import { JeuxService } from 'src/app/services/jeux.service';

@Component({
  selector: 'app-jeux-list',
  templateUrl: './jeux-list.component.html',
  styleUrls: ['./jeux-list.component.css']
})
export class JeuxListComponent {
  @Input() jeux: Jeu[] = [];
  @Input() readonly: boolean = false;
  @Output() emitUpdatedJeu = new EventEmitter<Jeu>();;
  jeuSelected: Jeu | undefined;

  constructor(public jeuService: JeuxService, public editorservice: EditorService) {
    console.log(this.readonly)
  }


  select(jeu: Jeu): void {
    this.jeuSelected = jeu;
    this.emitUpdatedJeu.emit(this.jeuSelected)
  }


  create(): void {
    this.jeuSelected = new Jeu('');
    this.emitUpdatedJeu.emit(this.jeuSelected)
  }
}
