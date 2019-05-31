import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FmapImportService } from '../models/fmap-import.service';
import { FmapFile } from '../models/fmapfile.model';
import { throwError as observableThrowError } from 'rxjs'
import { Router } from '@angular/router';
import { UiService } from 'src/app/common/ui.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {

  @ViewChild('file') file;
  selectedFile: File;
  selectedPath: string = '';
  uploading:boolean = false;

  constructor(private fmapImportService: FmapImportService, private uiservice: UiService,
    private router: Router) { 
  }

  ngOnInit() {
  }


  submit() {
    // validate - must have selected file
    if (this.selectedFile == null) {
      // show dialog.
      this.uiservice.showToast("No file selected. Please select a file to add.");
      return;
    }

    this.uploading = true;

    // get the file from local path and submit to the service - it's an async call (observable)
    let fileReader = new FileReader();
    fileReader.onload = (e) => {      
      let fmapFile = new FmapFile(this.selectedFile.name, Date.now(), null, null, fileReader.result as string);
      this.fmapImportService
        .add(fmapFile)
        .subscribe(
          f => {
            // redirect to the file detail by id.
            this.router.navigate(['/files/' + f.id]);   
            this.uploading = false;
            return true;       
          }, 
          err => {
            this.uploading = false;
            return observableThrowError(err);
        });
      };    
    
    fileReader.readAsText(this.file.nativeElement.files[0]);          
  }

  cancel() {
    this.router.navigate(['/files']);
  }

  fileOpenDialog() {
    this.file.nativeElement.click();
  }

  onFileSelected() {    
    this.selectedFile = this.file.nativeElement.files[0];
    this.selectedPath = this.selectedFile.name;
  }
}
