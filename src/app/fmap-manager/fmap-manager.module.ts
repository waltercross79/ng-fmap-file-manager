import { NgModule } from '@angular/core';
import { FileSearchComponent } from './file-search/file-search.component';
import { FileEditorComponent } from './file-editor/file-editor.component';
import { AddFileComponent } from './add-file/add-file.component';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { EntryEditorComponent } from './entry-editor/entry-editor.component';
import { FmapManagerRoutingModule } from './fmap-manager-routing.module'
import { MaterialModule } from '../material.module';
import { FmapManagerComponent } from './fmap-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { FmapManagerMaterialModule } from './fmap-manager-material.module';
import { FmapImportService } from './models/fmap-import.service';
import { FileListComponent } from './file-list/file-list.component';
import { SearchingComponent } from './searching/searching.component';

@NgModule({
  declarations: [FileSearchComponent, FileEditorComponent, AddFileComponent, 
    EntriesListComponent, EntryEditorComponent, FmapManagerComponent, FileListComponent, SearchingComponent],
  imports: [
    FmapManagerRoutingModule, MaterialModule, CommonModule, FmapManagerMaterialModule, 
    FormsModule, ReactiveFormsModule, FlexLayoutModule
  ],
  providers: [FmapImportService],
  entryComponents: [EntryEditorComponent]
})
export class FmapManagerModule { }
