import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FmapEntry } from '../models/fmapentry.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FmapImportService } from '../models/fmap-import.service';
import { UiService } from 'src/app/common/ui.service';

const permIdPattern = '^(AL|AK|AZ|AR|CA|CO|CT|DC|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)(C|M)(11|12|13|14|15|16|17|19)0[1-4](F|M)[0-9]{3}$';
const datePattern = '(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\\d\\d$';

@Component({
  selector: 'app-entry-editor',
  templateUrl: './entry-editor.component.html',
  styleUrls: ['./entry-editor.component.css']
})
export class EntryEditorComponent implements OnInit {
  
  entryForm: FormGroup;
  paymentDateControl: FormControl = new FormControl('', Validators.pattern(datePattern));
  screenshotDateControl: FormControl = new FormControl('', Validators.pattern(datePattern));
  permidControl: FormControl = new FormControl('', Validators.pattern(permIdPattern));
  fmapControl = new FormControl(0, Validators.required);
  entry: FmapEntry;

  constructor(private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: FmapEntry,
    public dialogRef: MatDialogRef<EntryEditorComponent>,
    private fileService: FmapImportService, private uiService: UiService) { 
      this.entry = data;
    }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.paymentDateControl.setValue(this.entry.paymentDate);
    this.screenshotDateControl.setValue(this.entry.screenshotDate);
    this.permidControl.setValue(this.entry.permId);
    this.fmapControl.setValue(this.entry.fmap);

    this.entryForm = this.fb.group({
      'id': new FormControl(this.entry.id),
      'permid': this.permidControl,
      'paymentDate': this.paymentDateControl,
      'fmap': this.fmapControl,
      'eligibilityCategory': new FormControl(this.entry.eligibilityCategory),
      'screenshotDate': this.screenshotDateControl
    });
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  submit(): void {
    this.fileService.updateentry(new FmapEntry(this.entryForm.value.permid,
      this.entryForm.value.paymentDate, this.entryForm.value.fmap,
      this.entryForm.value.eligibilityCategory, this.entryForm.value.id,
      this.entryForm.value.screenshotDate))
      .subscribe(result => {
        this.uiService.showToast("Entry updated successfully.")
        this.dialogRef.close(result);
      },
      error => {
        console.log(error);
        this.uiService.showToast("Internal Server Error.")
      });
  }

  getDateErrorMessage() {
    return "Date is missing or invalid";
  }
}
