import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TimePeriodComponent} from "../components/time-period.component";
import {TimeScheduleComponent} from "../components/time-schedule.component";
import {ReactiveFormsModule} from '@angular/forms';
import {TextsService} from "../services/texts.service";
import {StorageService} from "../services/storage.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    TimePeriodComponent,
    TimeScheduleComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [TextsService, StorageService],
  entryComponents: [TimeScheduleComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
