import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Note } from "../../providers/notes/note.model";
import { NotesProvider } from "../../providers/notes/notes";
import { AlertProvider } from "../../providers/alert/alert";

/**
 * Generated class for the NotesaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-notesadd",
  templateUrl: "notesadd.html"
})
export class NotesaddPage {
  noteForm: FormGroup;
  notes: Note;

  constructor(
    private fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private notesProvider: NotesProvider,
    private alertProvider: AlertProvider
  ) {
    this.createAddNoteForm();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad NotesaddPage");
  }

  saveNote() {
    this.alertProvider.showLoader(() => {
      this.notesProvider.create(this.noteForm.value).then(
        res => {
          this.alertProvider.dismissLoader();
          this.alertProvider.showToast("Note Added!");
          this.goBack();
        },
        () => {
          this.alertProvider.dismissLoader();
          this.alertProvider.showToast("Note add failed!");
        }
      );
    });
  }

  createAddNoteForm(note?: Note) {
    this.notes = new Note();
    this.noteForm = this.fb.group({
      title: [this.notes.title, Validators.required],
      description: [this.notes.description, Validators.required]
    });
  }

  goBack() {
    this.navCtrl.pop();
  }
}
