import {Component, OnInit} from "@angular/core";
import {StorageService} from "../../services/storage.service";

@Component({
  templateUrl: 'config-dashboard.html'
})
export class ConfigDashboardComponent implements OnInit {
  public configs = [];

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.storageService.getConfigs().subscribe((confs: any[]) => {
      this.configs = confs;
    });
  }

  public timeLabel(timestamp): string {
    if (timestamp) {
      let dateObj = new Date(timestamp);
      return [this.lpad(dateObj.getUTCDate()), this.lpad(dateObj.getUTCMonth() + 1), dateObj.getUTCFullYear()].join('/');
    }
    return '';
  }

  lpad(d): string {
    return d < 10 ? ('0' + d) : d;
  }
}
