import { Injectable } from '@angular/core';
import { AuthService, IAuthStatus } from './auth.service';
import { Router, CanActivateChild, CanLoad, ActivatedRouteSnapshot, 
  RouterStateSnapshot, Route, UrlSegment, UrlTree, CanActivate } from '@angular/router';
import { UiService } from '../common/ui.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate ,CanActivateChild, CanLoad {

  protected currentAuthStatus: IAuthStatus;

  constructor(protected authService: AuthService, 
    protected router: Router, private uiService: UiService) { 
      authService.authStatus.subscribe(s => this.currentAuthStatus = s);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin(childRoute);
  }
  
  canLoad(route: Route, segments: UrlSegment[]): 
  boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(route);
  }

  protected checkLogin(route?: ActivatedRouteSnapshot) {
    let roleMatch = true;
    let params: any;
    if (route) {
      const expectedRole = route.data.expectedRole;

      if (expectedRole) {
        roleMatch = this.currentAuthStatus.userRole === expectedRole;
      }

      if (!roleMatch) { // I think this should be !roleMatch, but tutorial has it this way - need to verify.
        params = { redirectUrl: route.pathFromRoot.map(r => r.url).join('/') }
      }
    }

    if (!this.currentAuthStatus.isAuthenticated || !roleMatch) {
      this.showAlert(this.currentAuthStatus.isAuthenticated, roleMatch);

      this.router.navigate(['login', params  || {}]);
      return false;
    }

    return true;
  }

  private showAlert(isAuth: boolean, roleMatch: boolean) {
    if (!isAuth) {
      this.uiService.showToast('You must login to continue');
    }

    if (!roleMatch) {
      this.uiService.showToast('You do not have the permissions to view this resource');
    }
  }
}
