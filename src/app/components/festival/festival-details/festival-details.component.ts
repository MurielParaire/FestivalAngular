import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor } from 'src/app/models/editor';
import { Festival } from 'src/app/models/festivals';
import { Jeu } from 'src/app/models/jeu';
import { EditorService } from 'src/app/services/editor.service';
import { FestivalsService } from 'src/app/services/festivals.service';


@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.css']
})

export class FestivalDetailsComponent {
  @Input() festival!: Festival
  @Output() emitUpdatedFestival = new EventEmitter<Festival>();

  public festivalGroup!: FormGroup;
  public EditorForm!: FormGroup;
  public editors: Editor[] = [];
  public editor: Editor = {};
  public jeux: Jeu[] = [];
  public restEditors: Editor[] = [];
  public selectedEditor: string | undefined;

  constructor(public fb: FormBuilder, private route: ActivatedRoute, private festivalService: FestivalsService, private router: Router, public editorService: EditorService) { }

  updateFormFromFestival() {
    console.log('this.festival')
    console.log(this.festival)
    this.festivalGroup = this.fb.group({
      name: [this.festival.name, [Validators.required, Validators.minLength(5)]],
      tablesEntree: [this.festival.tablemax_1, [Validators.required]],
      entrancePrice: [this.festival.tableprice_1, [Validators.required, Validators.min(50)]]
    })
    this.EditorForm = this.fb.group({
      selectedEditor: [null, Validators.required]
    })
  }

  addEditor() {
    console.log('Selected user:', this.selectedEditor);
    if (this.selectedEditor !== undefined) {
      this.festival.editors.push(this.selectedEditor)
      this.festivalService.addUpdateFestival(this.festival)
      this.update()
    }

  }

  update() {
    this.updateFormFromFestival()
    this.editors = []
    this.restEditors = []

  }

  onEditorSelected(editor: any) {
    console.log('here')
    console.log(editor)
    this.selectedEditor = editor;
    this.EditorForm.patchValue({ selectedEditor: editor.id });

  }

  ngOnChanges() {
    this.updateFormFromFestival()
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id != null && id != undefined && id != '0') {
        this.editors = []
        this.festivalService.getFestival(id).subscribe((fest: Festival) => {
          console.log(fest)
          this.festival = fest;
          this.updateFormFromFestival()
          this.festival.editors.forEach((ed: any) => {
            console.log('fireach')
            this.editors = []
            this.editorService.getEditor(ed).subscribe((edit: Editor) => {
              this.editors.push(edit)
              this.updateRestEditors()
            })
          })
        })

      }
      if (id == '0') {
        this.festival = new Festival('')
        this.updateFormFromFestival()
      }
    }

  }

  updateRestEditors() {
    this.restEditors = []
    console.log('res', this.restEditors)
    this.editorService.getAllEditors().subscribe((eds: Editor[]) => {
      console.log('len', eds.length)
      this.restEditors = eds;
      this.verifyEditors()
      this.verifyEditors()
    })
  }

  verifyEditors() {
    let k = this.restEditors.length
    for (let i = 0; i < k; i++) {
      const found = this.editors.some(ed => ed.id === this.restEditors[i].id);
      console.log('found')
      console.log(found)
      if (found) {
        this.restEditors.splice(i, 1)
        k = k - 1
      }
    }
  }

  selectEditor(editor: Editor) {
    console.log("editpt")
    console.log(editor)
    this.editor = editor;
  }


  validate(): void {
    this.festival.name = (this.festivalGroup.get('name')?.value == null) ? this.festival.name : this.festivalGroup.get('name')?.value
    this.festival.tablemax_1 = (this.festivalGroup.get('tablesEntree')?.value == null) ? this.festival.tablemax_1 : this.festivalGroup.get('tablesEntree')?.value
    this.festival.tableprice_1 = (this.festivalGroup.get('entrancePrice')?.value == null) ? this.festival.tableprice_1 : this.festivalGroup.get('entrancePrice')?.value

    console.log(this.festival)

    if (this.festival.id == undefined) {
      this.festivalService.addNewFestival(this.festival)
    }
    else {
      this.festivalService.addUpdateFestival(this.festival)
    }
    this.updateFormFromFestival()
    this.emitUpdatedFestival.emit(this.festival)
  }

  delete(): void {
    this.festivalService.deleteFestival(this.festival)
    this.router.navigate(['/app'])
  }


  removeEditor(editor: Editor) {
    console.log('editor', editor)
    this.festivalService.removeEditorFromFestival(this.festival, editor.id);
    this.update()
  }


}
