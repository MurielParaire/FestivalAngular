import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Editor } from './models/editor';
import { Festival } from './models/festivals';
import { FestivalsService } from './services/festivals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FestivalApp';
  festivals!: Observable<Festival[]>;
  editorSelected?: Editor | undefined;

  constructor(private festivalService: FestivalsService, private router: Router) { }

  ngOnInit() {
    this.festivals = this.festivalService.getAllFestivals()
  }

  select(festival: Festival): void {
    this.festivalSelected = festival;

    if (festival.id == undefined) {
      this.router.navigate(['festival/0'])
    }
    else {
      this.router.navigate([`festival/${festival.id}`])
    }
  }

  selectEditor(editor: Editor): void {
    this.editorSelected = editor;

    console.log(editor)
    if (editor.id == undefined || editor.id == null || editor.id == "") {
      this.router.navigate(['editor/0'])
    }
    else {
      this.router.navigate([`editor/${editor.id}`])
    }
  }

  festivalSelected?: Festival = undefined;

  updateFestival(festival: Festival): void {
    this.festivalSelected = festival
  }
}
