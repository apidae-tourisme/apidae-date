import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ModalComponent} from "./modal.component";

const modalRoutes: Routes = [
  {path: 'modal/:content/:type/:id', component: ModalComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(modalRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ModalRoutingModule {
}
