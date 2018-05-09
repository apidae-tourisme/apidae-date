import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfigComponent} from "./config.component";
import {ConfigRoutingModule} from "./config-routing.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../services/auth.service";
import {CommonModule} from "@angular/common";
import {ConfigPeriodsComponent} from "./config-periods.component";
import {ConfigEntitiesComponent} from "./config-entities.component";
import {ConfigDashboardComponent} from "./config-dashboard.component";

@NgModule({
  declarations: [
    ConfigComponent,
    ConfigDashboardComponent,
    ConfigPeriodsComponent,
    ConfigEntitiesComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    ConfigRoutingModule
  ],
  providers: [
    AuthService
  ]
})
export class ConfigModule {
}
