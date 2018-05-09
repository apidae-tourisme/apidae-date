import {Component, OnInit} from "@angular/core";
import {StorageService} from "../../services/storage.service";
import {TypeConfig} from "../../models/type-config";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: 'config-entities.html'
})
export class ConfigEntitiesComponent implements OnInit {
  private configType: string;
  public config: TypeConfig;

  constructor(private storageService: StorageService, private route: ActivatedRoute) {
    this.configType = this.route.snapshot.paramMap.get('type');
  }

  ngOnInit() {
    this.storageService.getConfig(this.configType).subscribe((conf: TypeConfig) => {
      this.config = conf;
    });
  }
}
