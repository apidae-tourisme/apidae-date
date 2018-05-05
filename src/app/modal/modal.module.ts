import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TextsService} from "../../services/texts.service";
import {StorageService} from "../../services/storage.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {TimeScheduleComponent} from "../form/time-schedule.component";
import {ModalComponent} from "./modal.component";
import {DetailsComponent} from "../details/details.component";
import {ModalRoutingModule} from "./modal-routing.module";
import {FormModule} from "../form/form.module";
import {DetailsModule} from "../details/details.module";

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    DetailsModule,
    FormModule,
    ModalRoutingModule
  ],
  providers: [TextsService, StorageService],
  entryComponents: [TimeScheduleComponent, DetailsComponent]
})
export class ModalModule {
}
