import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor } from 'src/app/models/editor';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-editor-list',
  templateUrl: './editor-list.component.html',
  styleUrls: ['./editor-list.component.css']
})
export class EditorListComponent {
  @Input() public editors: Editor[] | undefined;
  @Input() public readonly: boolean = false;
  @Output() emitUpdatedEditor = new EventEmitter<Editor>();
  editorSelected: Editor | undefined;

  constructor(public editorservice: EditorService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (this.editors == undefined) {
      this.editorservice.getAllEditors().subscribe((edits: Editor[]) => {
        this.editors = []
        this.editors = edits;
      })
    }

  }

  select(editor: Editor): void {
    if (this.route.snapshot.url[0].path == 'editors') {
      this.router.navigate([`editor/${editor.id}`])
    }
    else {
      this.editorSelected = editor;
      this.emitUpdatedEditor.emit(this.editorSelected)
    }
  }


  create(): void {
    this.editorSelected = new Editor('');
    this.emitUpdatedEditor.emit(this.editorSelected)
  }
}
