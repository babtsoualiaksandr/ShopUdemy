import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';


export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is simple',
      'https://img.delicious.com.au/52hfFIjf/h506-w759-cfill/del/2017/05/one-pot-butter-chicken-with-dill-yoghurt-46876-2.jpg',
      [
        new Ingredient('Meat', 2),
        new Ingredient('French Fries', 200)
      ]),
    new Recipe('Салат из авокадо', '1/4 c. оливковое масло первого отжима Сок из 1 извести  1/4 ч. Л. тмин',
      'https://www.gastronom.ru/binfiles/images/20160601/b58731d7.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('French Fries Meat', 300)
      ]) ,
      new Recipe('ТРОЙНОЙ БЕКОН BURGER',
       'Бэкон окунулся в пирожку с говядиной и увенчанный беконом, чеддером и ранчо барбекю. Подается с классическим картофелем фри.',
        'https://static.olocdn.net/menu/applebees/ffac757fc64d1e414422bf204f1a4f87.jpg',
        [
          new Ingredient('Buns', 2),
          new Ingredient('French Fries Meat', 300)
        ])

  ];

  constructor() { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    console.log(recipes);
    this.recipesChanged.next(this.recipes.slice());

  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }


  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
