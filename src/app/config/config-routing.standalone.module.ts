import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const configRoutes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild(configRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ConfigRoutingModule {}
