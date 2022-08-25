import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfigModule} from "./config/config.module";
import {AppRoutingModule} from "./app-routing.module";
import {ModalModule} from "./modal/modal.module";
import {LoginModule} from "./login/login.module";
import {HomeModule} from "./home/home.module";
import {TextsService} from "../services/texts.service";
import {StorageService} from "../services/storage.service";
import {StylesService} from "../services/styles.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HomeModule,
    LoginModule,
    ConfigModule,
    ModalModule,
    AppRoutingModule
  ],
  providers: [TextsService, StorageService, StylesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
