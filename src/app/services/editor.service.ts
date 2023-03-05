import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from
  '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Editor } from '../models/editor';
import { JeuxService } from './jeux.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private path = '/editeur/';
  private editorStore: AngularFirestore;
  private editorCollection: AngularFirestoreCollection<Editor>;

  constructor(private db: AngularFirestore,
    private messageService: MessageService, private jeuservice: JeuxService) {
    this.editorStore = db;
    this.editorCollection = db.collection(this.path);
  }


  doc2Editor(doc: any, id?: string): Editor {
    console.log('doc')
    console.log(doc)
    if (id == undefined) {
      id = doc.id
    }
    let jeux = this.jeuservice.getJeuxForEditor(doc.id).subscribe()
    return new Editor(
      id,
      doc.nom,
      doc.nom_societe,
      doc.contact,
      jeux);
  }

  Editor2Doc(editor: Editor): any {
    let doc = {
      id: editor.id,
      nom: editor.nom,
      nom_societe: editor.nom_societe,
      contact: editor.contact
    };
    return doc;
  }

  getAllEditors(): Observable<Editor[]> {
    return this.editorCollection
      .valueChanges({ idField: "id" }).pipe(
        tap(doc => { this.messageService.log(`doc=${JSON.stringify(doc)}`) }),
        map(data => data.map(doc => this.doc2Editor(doc)))
      );
  }




  addUpdateEditor(Editor: Editor) {
    if (Editor.id == null) {
      Editor.id = this.editorStore.createId()
    }
    this.editorCollection.doc(Editor.id).set(Object.assign({}, Editor));
  }


  addNewEditor(Editor: Editor) {
    let editor = this.Editor2Doc(Editor)
    if (editor.id == null || editor.id == undefined) {
      editor.id = this.editorStore.createId()
    }
    this.editorCollection.doc(editor.id).get()
      .subscribe(doc => {
        if (!doc.exists) {
          this.editorCollection.doc(editor.id).set(Object.assign({},
            editor));
        } // else doc exists!
      });
  }

  deleteEditor(Editor: Editor) {
    this.editorStore.doc<Editor>(this.path + Editor.id).delete();
  }


  getEditor(id: string): Observable<Editor> {
    console.log(id)
    console.log(this.path + id)
    var itemDoc = this.editorStore.doc<Editor>(this.path + id);
    return itemDoc.valueChanges({ idField: "id" })
      .pipe(
        map(ed => this.doc2Editor(ed, id))
      );
  }

}
