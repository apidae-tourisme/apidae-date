import {NgModule} from '@angular/core';
import {DetailsComponent} from "./details.component";
import {DetailsRoutingModule} from "./details-routing.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    BrowserModule,
    DetailsRoutingModule
  ]
})
export class DetailsModule {
}
