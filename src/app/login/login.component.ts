import {Component, OnInit} from "@angular/core";
import {OAUTH_AUTH_URL, OAUTH_CLIENT_ID} from "../app.config";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

declare var window: any;

@Component({
  selector: 'apidate-login',
  templateUrl: 'login.html'
})
export class LoginComponent implements OnInit {

  public redirecting = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    let url = window.location.href;
    if (url.indexOf('code') !== -1) {
      this.redirecting = true;
      this.authService.handleAuthCallback(url, () => {
        this.router.navigate(['/config']);
        this.redirecting = false;
      }, () => {
        console.log('handleAuthCallback error');
      });
    }
  }

  public logIn() {
    window.location.href = this.getOAuthUrl(encodeURIComponent(window.location.href));
  }

  private getOAuthUrl(redirectUrl): string {
    return OAUTH_AUTH_URL + '?client_id=' + OAUTH_CLIENT_ID + '&redirect_uri=' +
      redirectUrl + '&scope=sso&response_type=code';
  }
}
