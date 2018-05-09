import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ConfigComponent} from "./config/config.component";
import {AuthGuard} from "../services/auth-guard.service";
import {AuthService} from "../services/auth.service";

const appRoutes: Routes = [
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {
}
