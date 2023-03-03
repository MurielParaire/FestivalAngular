import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FestivalsListComponent } from './components/festival/festivals-list/festivals-list.component';
import { FestivalDetailsComponent } from './components/festival/festival-details/festival-details.component';
import { MessageComponent } from './components/shared/message/message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root/root.component';

import { HttpClientModule } from '@angular/common/http';
import { FestivalAppComponent } from './festival-app/festival-app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JeuxComponent } from './components/jeux/jeux/jeux.component';
import { EditorComponent } from './components/editor/editor/editor.component';
import { EditorListComponent } from './components/editor/editor-list/editor-list.component';
import { JeuxListComponent } from './components/jeux/jeux-list/jeux-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FestivalsListComponent,
    FestivalDetailsComponent,
    MessageComponent,
    RootComponent,
    FestivalAppComponent,
    JeuxComponent,
    EditorComponent,
    EditorListComponent,
    JeuxListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot([
      { path: 'festivals', component: FestivalsListComponent },
      { path: 'festival/:id', component: FestivalDetailsComponent },
      { path: 'app', component: AppComponent },
      { path: 'editors', component: EditorListComponent },
      { path: 'editor/:id', component: EditorComponent },
      { path: '', redirectTo: '/app', pathMatch: 'full' },
      //{path: '**', component: PageNotFoundComponent}
    ]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
