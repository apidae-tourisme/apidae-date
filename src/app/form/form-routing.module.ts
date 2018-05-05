import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const formRoutes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild(formRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FormRoutingModule {}
