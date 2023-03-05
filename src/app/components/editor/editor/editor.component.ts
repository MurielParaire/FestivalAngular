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
  @Output() emitRemoveEditor = new EventEmitter<Editor>();
  @Input() readonly: boolean = false;
  public editors: Editor[] | undefined;
  public jeux!: Jeu[];
  public selectedJeu: Jeu | undefined;

  public editorGroup!: FormGroup;

  constructor(public editorservice: EditorService, public fb: FormBuilder, private route: ActivatedRoute, private router: Router, public jeuservice: JeuxService) { }

  updateFormFromEditor() {
    this.editorGroup = this.fb.group({
      name: [this.editor.nom, [Validators.required, Validators.minLength(3)]],
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
    console.log('editor')
    console.log(this.editor)
    if (this.route.snapshot.paramMap.has('editorid')) {
      console.log('DZDZ')
      const id = this.route.snapshot.paramMap.get('editorid');
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
    else if (this.editor.id != undefined) {
      console.log('here')
      this.getJeux(this.editor.id)
      this.updateFormFromEditor()
    }
  }



  validate(): void {
    this.editor.nom = (this.editorGroup.get('name')?.value == null) ? this.editor.nom : this.editorGroup.get('name')?.value
    this.editor.nom_societe = (this.editorGroup.get('societe')?.value == null) ? this.editor.nom_societe : this.editorGroup.get('societe')?.value
    this.editor.contact = (this.editorGroup.get('contact')?.value == null) ? this.editor.contact : this.editorGroup.get('contact')?.value

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
    if (this.route.snapshot.paramMap.has('editorid')) {
      this.editorservice.deleteEditor(this.editor)
      this.router.navigate(['/app'])
    }
    else {
      this.emitRemoveEditor.emit(this.editor)
    }
  }

  deleteJeu(jeu: Jeu): void {
    if (this.editor.id != undefined) {
      this.jeuservice.deleteJeu(this.editor.id, jeu)
    }

  }


  updateJeu(jeu: Jeu) {
    this.selectedJeu = jeu;
  }


  updateJeuDb(jeu: Jeu) {
    if (this.editor.id != undefined) {
      if (jeu.id == undefined) {
        this.jeuservice.addJeuToEditor(this.editor.id, jeu)
      }
      else {
        this.jeuservice.updateJeu(this.editor.id, jeu)
      }
      this.getJeux(this.editor.id)
    }

  }

  getJeux(id: string) {
    this.jeuservice.getJeuxForEditor(id).subscribe((jeux: Jeu[]) => {
      this.jeux = jeux;
    })
  }


  remove() {
    console.log('hi')
    this.emitRemoveEditor.emit(this.editor)
  }

}
