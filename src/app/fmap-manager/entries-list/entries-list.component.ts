import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatTable } from '@angular/material';
import { FmapEntry } from '../models/fmapentry.model';
import { FmapImportService } from '../models/fmap-import.service';
import { EntryEditorComponent } from '../entry-editor/entry-editor.component';
import { UiService } from 'src/app/common/ui.service';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css']
})
export class EntriesListComponent implements OnInit {

  dataSource: MatTableDataSource<FmapEntry>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @Input('file-id') id: number;
  displayedColumns = ['permId', 'paymentDate', 'fmap', 'eligibilityCategory', 'screenshotDate', 'actions'];
  entries: FmapEntry[];

  constructor(private fileService: FmapImportService, 
    public dialog: MatDialog, private uiService: UiService) {     
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
    this.fileService.entries(this.id).subscribe(entries =>
    {
      this.entries = entries;
      this.dataSource.data = this.entries;
    })    
  }

  editEntry(entry: FmapEntry) {
    let dialogRef = this.dialog.open(EntryEditorComponent, {
      data: entry
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result === "Cancel") {
        return;
      }

      let that = this;
      if(result instanceof FmapEntry) {
        // Update the entry in the entry list.
        that.entries.splice(this.dataSource.data.findIndex(i => i.id == result.id), 1, result);
        that.dataSource.data = that.entries;
        that.table.renderRows();        
      }
    })
  }

  viewEntry(entry: FmapEntry) {
    this.uiService.showDialog("Original Entry", entry.originalValue, "OK");
  }

  deleteEntry(id: number) {
    let that = this;
    this.uiService.showDialog("Confirmation", "Are you sure you want to delete this entry?", "YES", "NO")
    .subscribe(result => {
      if(result) {
        this.fileService.deleteEntry(id).subscribe(() => {
          this.uiService.showToast("Entry deleted successfully.");
        
          // Update the entry in the entry list.
          that.entries.splice(this.dataSource.data.findIndex(i => i.id == id), 1);
          that.dataSource.data = that.entries;
          that.table.renderRows();        
        });
      }
    })
  }
}
