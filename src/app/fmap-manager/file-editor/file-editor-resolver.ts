import { Injectable } from '@angular/core';
import { FmapImportService } from '../models/fmap-import.service';
import { FmapFile } from '../models/fmapfile.model';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeAll, mergeMap } from 'rxjs/operators';

@Injectable()
export class FileEditorResolver implements Resolve<FmapFile> {

    constructor(private fmapService: FmapImportService, 
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        FmapFile | Observable<FmapFile> | Promise<FmapFile> {
        let id = route.paramMap.get('id');
        console.log(id);
        return this.fmapService.getFile(Number.parseInt(id)).pipe(
            take(1),
            mergeMap(file => {
                if (file) {
                    return of(file);
                } else {
                    this.router.navigate(['/files/search']);
                    return EMPTY;
                }                
            })
        );
    }
}