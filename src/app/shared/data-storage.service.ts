import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export  class DataStorageService {
  constructor(private httpclient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService ) {
  }
  storeRecipes_() {
  const token = this.authService.getToken();
  const request = new HttpRequest('PUT', 'https://ng-recipe-mybook.firebaseio.com/recipes.json?',
                                  this.recipeService.getRecipes(), {
                                    reportProgress: true,
                                    params: new HttpParams().set('auth', token) });
    return this.httpclient.request(request);
    }

    // *******
    storeRecipes() {
      const token = this.authService.getToken();
      // const headers = new HttpHeaders().set('Authorization', 'Bearer afhhhjjh');
      return  this.httpclient.put('https://ng-recipe-mybook.firebaseio.com/recipes.json?',
                        this.recipeService.getRecipes(), {
                          // observe: 'body'
                          observe: 'events',
                          reportProgress: true,
                         // params: new HttpParams().set('auth', token)
                          // headers: headers
                        });
        }

    getRecipes() {
       const token = this.authService.getToken();
        return  this.httpclient.get< Recipe[]>('https://ng-recipe-mybook.firebaseio.com/recipes.json?',
        {
          observe: 'body',
          responseType: 'json',
         // params: new HttpParams().set('auth', token)
        })
              .pipe(map(
                (recipes) => {
                  for (const recipe of recipes)  {
                    if (!recipe['ingredients']) {
                      recipe['ingredients'] = [];
                    }
                  }
                  this.recipeService.setRecipes(recipes);
                  return recipes;
                }))
                .pipe(catchError(error => {
                  return throwError('something went wrong = ' + 'что то пошло не так = ' + error);
              }));

      }
      // Нормальный метод
    getRecipesTipe() {
       const token = this.authService.getToken();
        return  this.httpclient.get< Recipe[]>('https://ng-recipe-mybook.firebaseio.com/recipes.json?auth=' + token)
              .pipe(map(
                (recipes) => {
                  for (const recipe of recipes)  {
                    if (!recipe['ingredients']) {
                      recipe['ingredients'] = [];
                    }
                  }
                  this.recipeService.setRecipes(recipes);
                  return recipes;
                }))
                .pipe(catchError(error => {
                  return throwError('something went wrong = ' + 'что то пошло не так = ' + error);
              }));

      }


}
