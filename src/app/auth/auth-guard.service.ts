import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    const isAuthenticated = this.store.select('auth').pipe(map((authState: fromAuth.State) => {
      return authState.authenticated;
    })
    );
    if (!isAuthenticated) {
      this.router.navigate(['/signin']);
    }
    return isAuthenticated;
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    const isAuthenticated = this.store.select('auth').pipe(map((authState: fromAuth.State) => {
      return authState.authenticated;
    })
    );
    if (!isAuthenticated) {
      this.router.navigate(['/signin']);
    }
    return isAuthenticated;
  }

}
