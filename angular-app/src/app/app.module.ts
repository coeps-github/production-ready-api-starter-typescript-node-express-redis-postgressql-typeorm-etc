import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebComponentsAngularModule } from "web-components-angular/src/web-components-angular.module";
import { MyAngularComponent } from "./my-angular.component";

@NgModule({
  declarations: [
    AppComponent,
    MyAngularComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebComponentsAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
