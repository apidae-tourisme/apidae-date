import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {OauthCallbackComponent} from "./oauth-callback.component";

const loginRoutes: Routes = [
  {
    path: 'connexion',
    component: LoginComponent
  },
  {
    path: 'callback',
    component: OauthCallbackComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {}
