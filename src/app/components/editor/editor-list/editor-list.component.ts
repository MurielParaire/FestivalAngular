import { Component, EventEmitter, Output } from '@angular/core';
import { Editor } from 'src/app/models/editor';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-editor-list',
  templateUrl: './editor-list.component.html',
  styleUrls: ['./editor-list.component.css']
})
export class EditorListComponent {
  public editors: Editor[] | undefined;
  @Output() emitUpdatedEditor = new EventEmitter<Editor>();;
  editorSelected: Editor | undefined;

  constructor(public editorservice: EditorService) { }

  ngOnInit() {
    this.editorservice.getAllEditors().subscribe((edits: Editor[]) => {
      this.editors = edits;
      console.log('finished')
      console.log(this.editors)
    })
  }

  select(editor: Editor): void {
    this.editorSelected = editor;
    this.emitUpdatedEditor.emit(this.editorSelected)
  }


  create(): void {
    this.editorSelected = new Editor('');
    this.emitUpdatedEditor.emit(this.editorSelected)
  }
}
