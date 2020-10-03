import { NgModule } from '@angular/core';
import { defineCustomElements } from "web-components/loader";

import { MyComponent } from './directives/proxies';

defineCustomElements(window);

const DECLARATIONS = [
  // TODO: Add proxies
  MyComponent
];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [],
  providers: []
})
export class WebComponentsAngularModule {
}
