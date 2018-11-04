import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { reducers } from './store/app.reducers';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    ShoppingListModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(reducers)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
