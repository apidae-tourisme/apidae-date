import {RouterModule, Routes} from "@angular/router";
import {ConfigComponent} from "./config.component";
import {NgModule} from "@angular/core";

const configRoutes: Routes = [
  {path: 'config/:type', component: ConfigComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(configRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ConfigRoutingModule {}
