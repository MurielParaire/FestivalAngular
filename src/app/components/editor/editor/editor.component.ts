import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor } from 'src/app/models/editor';
import { Jeu } from 'src/app/models/jeu';
import { EditorService } from 'src/app/services/editor.service';
import { JeuxService } from 'src/app/services/jeux.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @Input() editor!: Editor;
  @Output() emitUpdatedEditor = new EventEmitter<Editor>();
  public editors: Editor[] | undefined;
  public jeux!: Jeu[];
  public selectedJeu: Jeu | undefined;

  public editorGroup!: FormGroup;

  constructor(public editorservice: EditorService, public fb: FormBuilder, private route: ActivatedRoute, private router: Router, public jeuservice: JeuxService) { }

  updateFormFromEditor() {
    this.editorGroup = this.fb.group({
      name: [this.editor.nom, [Validators.required, Validators.minLength(5)]],
      societe: [this.editor.nom_societe, [Validators.required]],
      contact: [this.editor.contact, [Validators.required]],
    })
  }

  ngOnChanges() {
    this.updateFormFromEditor()
    if (this.editor.id) {
      this.jeux = this.jeuservice.getJeuxForEditor(this.editor.id)
    }

  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id != null && id != undefined && id != '0') {
        this.editorservice.getEditor(id).subscribe((ed: Editor) => {
          this.editor = ed;
          this.editor.id = id;
          this.getJeux(id)
          this.updateFormFromEditor()
        })
      }
      if (id == '0') {
        this.editor = new Editor()
        this.updateFormFromEditor()
      }
    }
  }



  validate(): void {
    this.editor.nom = (this.editorGroup.get('name')?.value == null) ? this.editor.nom : this.editorGroup.get('name')?.value
    this.editor.nom_societe = (this.editorGroup.get('societe')?.value == null) ? this.editor.nom_societe : this.editorGroup.get('societe')?.value
    this.editor.contact = (this.editorGroup.get('contact')?.value == null) ? this.editor.contact : this.editorGroup.get('contact')?.value

    console.log(this.editor)

    if (this.editor.id == undefined) {
      this.editorservice.addNewEditor(this.editor)
    }
    else {
      this.editorservice.addUpdateEditor(this.editor)
    }
    this.updateFormFromEditor()
    this.emitUpdatedEditor.emit(this.editor)
  }

  delete(): void {
    this.editorservice.deleteEditor(this.editor)
    this.router.navigate(['/app'])
  }

  deleteJeu(jeu: Jeu): void {
    console.log('this.editor')
    if (this.editor.id != undefined) {
      console.log('hi')
      this.jeuservice.deleteJeu(this.editor.id, jeu)
    }

  }


  updateJeu(jeu: Jeu) {
    this.selectedJeu = jeu;
  }


  updateJeuDb(jeu: Jeu) {
    console.log('huo')
    if (this.editor.id != undefined) {
      if (jeu.id == undefined) {
        this.jeuservice.addJeuToEditor(this.editor.id, jeu)
      }
      else {
        console.log('h')
        this.jeuservice.updateJeu(this.editor.id, jeu)
      }
      this.getJeux(this.editor.id)
    }

  }

  getJeux(id: string) {
    this.jeuservice.getJeuxForEditor(id).subscribe((jeux: Jeu[]) => {
      this.jeux = jeux;
      console.log(this.jeux)
    })
  }

}
