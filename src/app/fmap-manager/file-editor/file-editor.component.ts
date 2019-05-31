import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FmapFile } from '../models/fmapfile.model';
import { Observable } from 'rxjs/internal/Observable';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/common/ui.service';
import { FmapImportService } from '../models/fmap-import.service';

@Component({
  selector: 'app-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.css']
})
export class FileEditorComponent implements OnInit {

  minDate: Date = new Date(2018, 1, 1);
  maxDate: Date = new Date(Date.now());
  fileForm: FormGroup;
  receivedDateControl: FormControl = new FormControl('', Validators.required);
  id: number;
  processedDate: Date;
  showEntries: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private uiService: UiService, private fileService: FmapImportService) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: {file: FmapFile}) => {
        this.id = data.file.id;
        this.processedDate = data.file.processedDate;
        this.buildFileForm(data.file);
      });    
  }

  buildFileForm(file: FmapFile) {
    this.receivedDateControl.setValue(file.receivedDate);

    this.fileForm = this.fb.group({
      "name": new FormControl(file.name, Validators.required),
      "receivedDate": this.receivedDateControl,
      "processedDate": new FormControl({value: file.processedDate, disabled: true})
    });
  }  

  getReceivedDateMessage() {
    return "Received date is missing or invalid";
  }

  cancel() {
    // should check whether form is dirty?
    if(this.fileForm.dirty) {
      this.uiService.showDialog("Confirmation", "All changes will be discarded. Do you want to continue?", 
      "Yes", "No").subscribe((confirmed) => {
        if(confirmed) {
          this.navigateToFiles();
        }
      });
    } else {
      this.navigateToFiles();
    }    
  }

  submit() {  
    this.fileService.process(new FmapFile(this.fileForm.value.name, 
      this.fileForm.value.receivedDate, 
      this.id, this.processedDate != null ? this.processedDate : new Date(Date.now())))
      .subscribe(
        f => {
          this.buildFileForm(f);
          this.uiService.showToast("File was processed successfully.");
        }, 
        error => {
          console.log(error);
          this.uiService.showToast("Error saving file changes!");
        });    
  }

  update() {
    this.fileService.update(new FmapFile(this.fileForm.value.name, 
      this.fileForm.value.receivedDate, 
      this.id, this.processedDate != null ? this.processedDate : new Date(Date.now())))
      .subscribe(
        f => {
          this.buildFileForm(f);
          this.uiService.showToast("File was updated successfully.");
        }, 
        error => {
          console.log(error);
          this.uiService.showToast("Error saving file changes!");
        });    
  }

  navigateToFiles() {
    this.router.navigate(['/files']);
  }

  displayEntries() {
    this.showEntries = true;
  }
}
