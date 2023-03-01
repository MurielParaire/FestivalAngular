import { Component } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  constructor(public messageService : MessageService) { 
    this.messageService = messageService
    this.messageService.log("Affichage de la liste de festivals réussi !")
  }    

  clear() :void {
    this.messageService.clear()
  }

  addMessage() : void {
    this.messageService.log("Ceci est le message le plus intéressant que vous avez jamais lu.")
  }
}
