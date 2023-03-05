import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from
  '@angular/fire/compat/firestore';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Editor } from '../models/editor';
import { Festival } from '../models/festivals';
import { EditorService } from './editor.service';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class FestivalsService {
  private path = '/festivals/';
  private festivalStore: AngularFirestore;
  private festivalCollection: AngularFirestoreCollection<Festival>;

  constructor(private db: AngularFirestore,
    private messageService: MessageService, public editorService: EditorService) {
    this.festivalStore = db;
    this.festivalCollection = db.collection(this.path);
  }



  doc2Festival(doc: any, withEditors: boolean): Festival {
    let editors: Editor[];
    editors = [];
    console.log(doc)
    return new Festival(
      doc.name, doc.id, doc.tablemax_1, doc.tablemax_2,
      doc.tablemax_3, doc.tableprice_1, doc.tableprice_2, doc.tableprice_3,
      doc.sqmprice_1, doc.sqmprice_2, doc.sqmprice_3, doc.tablebooked_1, doc.tablebooked_2,
      doc.tablebooked_3, doc.editeurs
    );
  }

  festival2Doc(festival: Festival): any {
    let editors: String[] = [];
    festival.editors.forEach((ed: string) => {
      editors.push(ed)
    })
    return {
      name: festival.name, id: festival.id, tablemax_1: festival.tablemax_1, tablemax_2: festival.tablemax_2,
      tablemax_3: festival.tablemax_3, tableprice_1: festival.tableprice_1, tableprice_2: festival.tableprice_2,
      tableprice_3: festival.tableprice_3, sqmprice_1: festival.sqmprice_1, sqmprice_2: festival.sqmprice_2,
      sqmprice_3: festival.sqmprice_3, tablebooked_1: festival.tablebooked_1, tablebooked_2: festival.tablebooked_2,
      tablebooked_3: festival.tablebooked_3, editeurs: editors
    }
  }

  getAllFestivals(): Observable<Festival[]> {
    return this.festivalCollection
      .valueChanges({ idField: "id" }).pipe(
        tap(doc => { this.messageService.log(`doc=${JSON.stringify(doc)}`) }),
        map(data => data.map(doc => this.doc2Festival(doc, false)))
      );
  }


  addUpdateFestival(fest: Festival) {
    let festival = this.festival2Doc(fest)
    if (festival.id == null) {
      festival.id = this.festivalStore.createId()
    }
    this.festivalCollection.doc(festival.id).set(Object.assign({}, festival));
  }


  addNewFestival(fest: Festival) {
    let festival = this.festival2Doc(fest)
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
        map(fest => this.doc2Festival(fest, true))
      );
  }


  removeEditorFromFestival(fest: Festival, id: string = "") {
    fest.editors.forEach((ed, index) => {
      if (ed === id) { fest.editors.splice(index, 1); }
    });
    this.addUpdateFestival(fest)
  }




}
