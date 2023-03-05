import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {


  constructor(public router: Router) { }

  toMainPage() {
    this.router.navigate(['/app'])
  }


  toFestivals() {
    this.router.navigate(['/festivals'])
  }

  toEditors() {
    this.router.navigate(['/editors'])
  }

}
