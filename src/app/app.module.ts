import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FestivalsListComponent } from './components/festival/festivals-list/festivals-list.component';
import { FestivalDetailsComponent } from './components/festival/festival-details/festival-details.component';
import { MessageComponent } from './components/shared/message/message.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root/root.component';

import { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    AppComponent,
    FestivalsListComponent,
    FestivalDetailsComponent,
    MessageComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'festivals', component: FestivalsListComponent},
      {path: 'festival/:festivalId', component: FestivalDetailsComponent},
      {path: 'App', component: AppComponent},
      {path: '', redirectTo: '/App', pathMatch: 'full'},
      //{path: '**', component: PageNotFoundComponent}
      ]),
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
