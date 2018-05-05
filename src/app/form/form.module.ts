import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TimePeriodComponent} from "./time-period.component";
import {TimeScheduleComponent} from "./time-schedule.component";
import {TextsService} from "../../services/texts.service";
import {StorageService} from "../../services/storage.service";
import {FormRoutingModule} from "./form-routing.module";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    TimePeriodComponent,
    TimeScheduleComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormRoutingModule
  ],
  providers: [TextsService, StorageService]
})
export class FormModule {
}
