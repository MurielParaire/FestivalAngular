import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from
  '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Jeu } from '../models/jeu';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  private path = '/editeur/';
  private editorStore: AngularFirestore;
  private editorCollection: AngularFirestoreCollection<Jeu>;
  private collName = 'jeux'

  constructor(private db: AngularFirestore,
    private messageService: MessageService) {
    this.editorStore = db;
    this.editorCollection = db.collection(this.path);
  }


  doc2Jeu(doc: any): Jeu {
    console.log('jeu')
    console.log(doc)
    return new Jeu(
      doc.nom,
      doc.id,
      doc.type,
      doc.age_max,
      doc.age_min,
      doc.duree,
      doc.nb_joueurs_max,
      doc.nb_joueurs_min);
  }

  getJeuxForEditor(id: string): any {
    let res = this.editorCollection.doc(id).collection(this.collName)

    return res.valueChanges({ idField: 'id' }).pipe(
      tap(doc => { this.messageService.log(`jeu=${JSON.stringify(doc)}`) }),
      map(data => data.map(doc => this.doc2Jeu(doc)))
    );
  }


  updateJeu(id: string, jeu: Jeu) {
    if (jeu.id == null || jeu.id == undefined) {
      jeu.id = this.editorStore.createId()
    }
    this.editorCollection.doc(id).collection(this.collName).doc(jeu.id).set(Object.assign({}, jeu));
  }

  addJeuToEditor(id: string, jeu: Jeu) {
    if (jeu.id == null || jeu.id == undefined) {
      jeu.id = this.editorStore.createId()
    }
    if (jeu.id != null && id != null) {
      this.editorCollection.doc(id).collection(this.collName).doc(jeu.id).get()
        .subscribe(doc => {
          if (!doc.exists) {
            this.editorCollection.doc(id).collection(this.collName).doc(jeu.id).set(Object.assign({},
              jeu));
          } // else doc exists!
        });
    }

  }

  deleteJeu(id: string, jeu: Jeu) {
    this.editorStore.doc(this.path + id).collection(this.collName).doc(jeu.id).delete();
  }

}
