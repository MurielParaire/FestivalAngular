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


  doc2Festival(doc: any): Festival {
    return new Festival(
      doc.name, doc.id, doc.tablemax_1, doc.tablemax_2,
      doc.tablemax_3, doc.tableprice_1, doc.tableprice_2, doc.tableprice_3,
      doc.sqmprice_1, doc.sqmprice_2, doc.sqmprice_3, doc.tablebooked_1, doc.tablebooked_2, doc.tablebooked_3
    );
  }

  getAllFestivals(): Observable<Festival[]> {
    return this.festivalCollection
      .valueChanges({ idField: "id" }).pipe(
        tap(doc => { this.messageService.log(`doc=${JSON.stringify(doc)}`) }),
        map(data => data.map(doc => this.doc2Festival(doc)))
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
