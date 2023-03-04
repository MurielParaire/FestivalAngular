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


  doc2Editor(doc: any): Editor {
    let jeux = this.jeuservice.getJeuxForEditor(doc.id)
    return new Editor(
      doc.id,
      doc.nom,
      doc.nom_societe,
      doc.contact,
      jeux);
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
    if (Editor.id == null) {
      Editor.id = this.editorStore.createId()
    }
    this.editorCollection.doc(Editor.id).get()
      .subscribe(doc => {
        if (!doc.exists) {
          this.editorCollection.doc(Editor.id).set(Object.assign({},
            Editor));
        } // else doc exists!
      });
  }

  deleteEditor(Editor: Editor) {
    this.editorStore.doc<Editor>(this.path + Editor.id).delete();
  }
  getEditor(id: String): Observable<Editor> {
    var itemDoc = this.editorStore.doc<Editor>(this.path + id);
    return itemDoc.valueChanges()
      .pipe(
        map(fest => this.doc2Editor(fest))
      );
  }

}
