import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfigComponent} from "./config.component";
import {ConfigRoutingModule} from "./config-routing.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    ConfigComponent
  ],
  imports: [
    NgbModule,
    ReactiveFormsModule,
    ConfigRoutingModule
  ]
})
export class ConfigModule {
}
