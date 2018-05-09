import {NgModule} from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    NgbModule,
    HomeRoutingModule
  ]
})
export class HomeModule {
}
