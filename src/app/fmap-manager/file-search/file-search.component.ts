import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-file-search',
  templateUrl: './file-search.component.html',
  styleUrls: ['./file-search.component.css']
})
export class FileSearchComponent implements OnInit {

  search: FormControl = new FormControl('');
  filter = new BehaviorSubject<string>('');

  filter$: Observable<string>;

  ngOnInit() {
    this.filter$ = this.filter.asObservable(); // encapsulates filter.
  }

  submit() {
    this.filter.next(this.search.value);
  }
}
