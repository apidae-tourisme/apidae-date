import {Component, Inject} from '@angular/core';
import {Params, Router} from "@angular/router";
import {DEFAULT_STATE, INIT_PARAMS} from "./app.config";

@Component({
  selector: 'apidate-root',
  template: `<div class="container"><router-outlet></router-outlet></div>`
})
export class AppComponent {
  constructor(@Inject(DEFAULT_STATE) defaultState: string[], @Inject(INIT_PARAMS) initParams: Params, private router: Router) {
    if (defaultState) {
      this.router.navigate(defaultState, {skipLocationChange: defaultState[0] === '/modal'});
    }
  }
}
