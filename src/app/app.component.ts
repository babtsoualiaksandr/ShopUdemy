import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Shop';
  loaderFeature = 'recipe';
ngOnInit() {
  firebase.initializeApp({
    apiKey: 'AIzaSyBJTTGla-V8huOGDc8EZs_5YD1b2MC27v4',
    authDomain: 'ng-recipe-mybook.firebaseapp.com'
  });


}
  onNavigate(feature: string) {
    this.loaderFeature = feature;
    console.log(this.loaderFeature);

  }

}
