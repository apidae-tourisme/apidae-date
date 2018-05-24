import {RouterModule, Routes} from "@angular/router";
import {ConfigComponent} from "./config.component";
import {NgModule} from "@angular/core";
import {AuthGuard} from "../../services/auth-guard.service";
import {ConfigPeriodsComponent} from "./config-periods.component";
import {ConfigEntitiesComponent} from "./config-entities.component";
import {ConfigDashboardComponent} from "./config-dashboard.component";

const configRoutes: Routes = [
  {
    path: 'config',
    canActivate: [AuthGuard],
    component: ConfigComponent,
    children: [
      {path: '', component: ConfigDashboardComponent},
      {
        path: ':type',
        children: [
          {path: 'types-horaires', component: ConfigPeriodsComponent},
          {path: 'types-objets', component: ConfigEntitiesComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(configRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ConfigRoutingModule {}
