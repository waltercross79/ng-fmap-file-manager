import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFileComponent } from './add-file/add-file.component';
import { FileSearchComponent } from './file-search/file-search.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { Role } from '../auth/role.enum';
import { FmapManagerComponent } from './fmap-manager.component';
import { FileEditorComponent } from './file-editor/file-editor.component';
import { FileEditorResolver } from './file-editor/file-editor-resolver';

const routes: Routes = [ {
    path: '', component: FmapManagerComponent, children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },      
      { 
        path: 'add', 
        component: AddFileComponent,
        canActivate: [AuthGuard],        
        data: { expectedRole: Role.Admin }        
      },
      { 
        path: 'search',  // URL: files/search
        component: FileSearchComponent,
        canActivate: [AuthGuard], 
        data: { expectedRole: Role.Admin },        
      },
      { 
        path: ':id', 
        component: FileEditorComponent,
        canActivate: [AuthGuard], 
        data: { expectedRole: Role.Admin },
        resolve: { file: FileEditorResolver },        
      },
    ]
  }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [FileEditorResolver]
})
export class FmapManagerRoutingModule {

}