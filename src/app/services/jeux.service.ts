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

  private path = '/editeur/x/jeux/';
  private jeuStore: AngularFirestore;
  private jeuCollection: AngularFirestoreCollection<Jeu>;

  constructor(private db: AngularFirestore,
    private messageService: MessageService) {
    this.jeuStore = db;
    this.jeuCollection = db.collection(this.path);
  }


  doc2Jeu(doc: any): Jeu {
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
    this.path.replace('x', id)
    this.jeuCollection = this.db.collection(this.path);
    return this.jeuCollection.valueChanges().pipe(
      tap(doc => { this.messageService.log(`doc=${JSON.stringify(doc)}`) }),
      map(data => console.log(data))
    ).subscribe();
  }

  doc2Editor(doc: any): Jeu {
    console.log(doc)
    return new Jeu(
      doc.name,
      doc.id);
  }

  getAllJeux(): Observable<Jeu[]> {
    return this.jeuCollection
      .valueChanges({ idField: "id" }).pipe(
        tap(doc => { this.messageService.log(`doc=${JSON.stringify(doc)}`) }),
        map(data => data.map(doc => this.doc2Editor(doc)))
      );
  }


}
