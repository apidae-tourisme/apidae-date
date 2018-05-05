import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const detailsRoutes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild(detailsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DetailsRoutingModule {}
