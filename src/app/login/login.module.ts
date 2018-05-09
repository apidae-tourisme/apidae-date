import {NgModule} from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "./login.component";
import {LoginRoutingModule} from "./login-routing.module";
import {OauthCallbackComponent} from "./oauth-callback.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    LoginComponent,
    OauthCallbackComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule {
}
