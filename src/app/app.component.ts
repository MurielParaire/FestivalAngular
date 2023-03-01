import { Component } from '@angular/core';
import { Festival } from './models/festivals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FestivalApp';
  festivals : Festival[] = [
    new Festival('FJM2020'),new Festival('FJM2018'),new Festival('FJM2019')
  ]
}
