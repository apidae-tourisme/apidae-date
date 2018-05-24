import {Component, OnInit} from "@angular/core";
import {StorageService} from "../../services/storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: 'config-dashboard.html'
})
export class ConfigDashboardComponent implements OnInit {
  public configs = [];
  public saved: boolean;

  constructor(private storageService: StorageService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.saved = this.route.snapshot.queryParams.saved;
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

  public dismissAlert() {
    this.saved = false;
  }

  private lpad(d): string {
    return d < 10 ? ('0' + d) : d;
  }
}
