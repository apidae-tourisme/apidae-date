import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TextsService} from "../services/texts.service";
import {StorageService} from "../services/storage.service";
import {APP_BASE_HREF} from '@angular/common';
import {UtilsComponent} from "./utils.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    UtilsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}, TextsService, StorageService],
  bootstrap: [UtilsComponent]
})
export class UtilsModule {
}
