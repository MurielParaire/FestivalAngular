import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from
  '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Festival } from '../models/festivals';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class FestivalsService {
  private path = '/festivals/';
  private festivalStore: AngularFirestore;
  private festivalCollection: AngularFirestoreCollection<Festival>;

  constructor(private db: AngularFirestore,
    private messageService: MessageService) {
    this.festivalStore = db;
    this.festivalCollection = db.collection(this.path);
  }


  json2Festival(json: any): Festival {
    return new Festival(
      json.name, json.id, json.tablemax_1, json.tablemax_2,
      json.tablemax_3, json.tableprice_1, json.tableprice_2, json.tableprice_3,
      json.sqmprice_1, json.sqmprice_2, json.sqmprice_3);
  }

  doc2Festival(doc: any): Festival {
    return new Festival(
      doc.name, doc.id, doc.tablemax_1, doc.tablemax_2,
      doc.tablemax_3, doc.tableprice_1, doc.tableprice_2, doc.tableprice_3,
      doc.sqmprice_1, doc.sqmprice_2, doc.sqmprice_3
    );
  }

  getAllFestivals(): Observable<Festival[]> {
    return this.festivalCollection
      .valueChanges({ idField: "id" }).pipe(
        tap(doc => { this.messageService.log(`doc=${JSON.stringify(doc)}`) }),
        map(data => data.map(doc => this.json2Festival(doc)))
      );
  }


  addUpdateFestival(festival: Festival) {
    if (festival.id == null) {
      festival.id = this.festivalStore.createId()
    }
    this.festivalCollection.doc(festival.id).set(Object.assign({}, festival));
  }


  addNewFestival(festival: Festival) {
    if (festival.id == null) {
      festival.id = this.festivalStore.createId()
    }
    this.festivalCollection.doc(festival.id).get()
      .subscribe(doc => {
        if (!doc.exists) {
          this.festivalCollection.doc(festival.id).set(Object.assign({},
            festival));
        } // else doc exists!
      });
  }

  deleteFestival(festival: Festival) {
    this.festivalStore.doc<Festival>(this.path + festival.id).delete();
  }
  getFestival(id: String): Observable<Festival> {
    var itemDoc = this.festivalStore.doc<Festival>(this.path + id);
    return itemDoc.valueChanges()
      .pipe(
        map(fest => this.doc2Festival(fest))
      );
  }




}
