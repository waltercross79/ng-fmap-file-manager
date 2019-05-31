import { Injectable } from '@angular/core';
import { FmapFile, IFmapFile } from './fmapfile.model';
import { Observable } from 'rxjs';
import { FmapEntry } from './fmapentry.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class FmapImportService implements IFmapImportService {

  entries(file_id: number) : Observable<FmapEntry[]> {
    return this.http.get<FmapEntry[]>(
      environment.smerfUrl + 'fmapfile/entries/' + file_id);
  }

  add(file: FmapFile): Observable<FmapFile> {
    return this.http.post<FmapFile>(
      environment.smerfUrl + 'fmapfile/add/', file
    )    
  }

  process(file: FmapFile): Observable<FmapFile> {
    return this.http.post<FmapFile>(
      environment.smerfUrl + 'fmapfile/process/', file
    )
  }

  update(file: FmapFile): Observable<FmapFile> {
    return this.http.post<FmapFile>(
      environment.smerfUrl + 'fmapfile/update/', file
    )
  }

  delete(id: number): Observable<any> {
    return this.http.post<FmapFile>(
      environment.smerfUrl + 'fmapfile/delete/' + id, null);
  }

  getFile(id: number): Observable<FmapFile> {
    return this.http.get<FmapFile>(
      environment.smerfUrl + 'fmapfile/detail/' + id);
  }

  find(filter?: string) : Observable<FmapFile[]> {
    return this.http.get<FmapFile[]>(
      environment.smerfUrl + 'fmapfile/search?filter=' + (filter != null ? encodeURI(filter) : ''));
  }

  updateentry(entry: FmapEntry) : Observable<FmapEntry> {
    return this.http.post<FmapEntry>(
      environment.smerfUrl + 'fmapfile/updateentry/', entry);
  }

  deleteEntry(entry_id: number) : Observable<any> {
    return this.http.post<FmapEntry>(
      environment.smerfUrl + 'fmapfile/deleteentry/' + entry_id, null);    
  }

  constructor(private http: HttpClient) { }
}


export interface IFmapImportService {
  add(file: FmapFile): Observable<FmapFile>;
  process(file: FmapFile): Observable<FmapFile>;
  update(file: FmapFile): Observable<FmapFile>;
  delete(id: number): Observable<any>;
  getFile(id: number): Observable<FmapFile>;
  find(filter: string) : Observable<FmapFile[]>
  entries(file_id: number) : Observable<FmapEntry[]>;
  updateentry(entry: FmapEntry) : Observable<FmapEntry>;
  deleteEntry(entry_id: number) : Observable<any>;
}