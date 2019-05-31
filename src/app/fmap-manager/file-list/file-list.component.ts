import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FmapImportService } from '../models/fmap-import.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort, MatTable } from '@angular/material';
import { FmapFile } from '../models/fmapfile.model';
import { UiService } from 'src/app/common/ui.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  displayedColumns = ['name', 'receivedDate', 'processedDate', 'actions'];
  dataSource: MatTableDataSource<FmapFile>;
  private _filter = new BehaviorSubject<string>('');
  files: FmapFile[] = [];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  @Input() set filter(value: string) {
    this._filter.next(value);
  }

  constructor(private fileService: FmapImportService, private uiService: UiService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
    
    this._filter.subscribe(filter => {
      this.searchFiles(filter);      
    }, 
    error => console.log(error));
  }

  searchFiles(filter: string) {
    console.log(filter);    
    this.fileService.find(filter)
      .subscribe(files => {
        this.dataSource.data = files;
        this.files = files;
      });
  }

  delete(id: number) {
    let f = this.dataSource.data.find(f => f.id == id);
    let that = this;

    if(f == null)
      return;

    this.uiService.showDialog("Confirmation", 
      "Are you sure you want to delete this file?", "Yes", "No")
      .subscribe(confirmed => {
        if(confirmed) {
          this.fileService.delete(id)
          .subscribe((res) => {
            // reload the list.        
            this.uiService.showToast("File deleted.");
            that.files.splice(that.files.indexOf(f), 1);
            that.dataSource.data = that.files;
            that.table.renderRows();
          }, error => {
            console.log(error);
            this.uiService.showToast("Server error while deleting file.");
          });
        }
      });    
  }
}
