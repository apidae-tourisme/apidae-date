import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ConfigComponent} from "./config/config.component";

const appRoutes: Routes = [
  {path: 'config', component: ConfigComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
