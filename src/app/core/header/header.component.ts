import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Component, OnInit} from '@angular/core';

import { HttpEvent } from '@angular/common/http';

import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from 'src/app/recipes/recipe.model';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 authState: Observable<fromAuth.State>;
  constructor(private dataStorageService: DataStorageService,
              public authService: AuthService,
              private router: Router,
              private store: Store<fromApp.AppState>) { }


  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  /* onSelect(feature: string) {
    this.featureSelected.emit(feature);
    console.log(feature);
  } */

  onSaveData() {
    this.dataStorageService.storeRecipes()
          .subscribe(
            (response: HttpEvent<any>) => {
              console.log(response);
              }
            );
  }

  onFetchData() {
    this.dataStorageService.getRecipes().subscribe((recipe: Recipe[]) => {console.log(recipe); });
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/']);

  }


}
