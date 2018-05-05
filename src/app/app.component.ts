import {Component, Inject} from '@angular/core';
import {Params, Router} from "@angular/router";
import {DEFAULT_STATE, INIT_PARAMS} from "./app.config";

@Component({
  selector: 'apidate-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(@Inject(DEFAULT_STATE) defaultState: string, @Inject(INIT_PARAMS) initParams: Params, private router: Router) {
    router.navigate(['/modal', defaultState, initParams.type, initParams.externalId], {skipLocationChange: true});
  }
}
