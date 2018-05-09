import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

declare var window: any;

@Component({
  template: ``
})
export class OauthCallbackComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    let url = window.location.href;
    if (url.indexOf('code') !== -1) {
      this.authService.handleAuthCallback(url, () => {
        this.router.navigate(['/config']);
      }, () => {
        console.log('handleAuthCallback error');
      });
    } else {
      this.router.navigate(['/connexion']);
    }
  }
}
