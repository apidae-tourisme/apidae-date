import {Injectable} from "@angular/core";
import {OAUTH_CLIENT_ID, OAUTH_PROFILE_URL, OAUTH_REDIRECT_URL, OAUTH_SECRET, OAUTH_TOKEN_URL} from "../app/app.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthService {
  public userEmail: string;

  constructor(private http: HttpClient) {}

  handleAuthCallback(callBackUrl, success, error?) {

    if (callBackUrl.indexOf(OAUTH_REDIRECT_URL) === 0) {
      let callBackCode = callBackUrl.split("code=")[1];
      let code = callBackCode.split("&")[0];
      let tokenHeader = {headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(OAUTH_CLIENT_ID + ":" + OAUTH_SECRET)
        })};
      let queryParams = "grant_type=authorization_code&redirect_uri=" + OAUTH_REDIRECT_URL + "&code=" + code;
      this.http.post(OAUTH_TOKEN_URL, queryParams, tokenHeader).subscribe((data: any) => {
        let profileHeader = {headers: new HttpHeaders({'Authorization': 'Bearer ' + data.access_token})};
        this.http.get(OAUTH_PROFILE_URL, profileHeader).subscribe((profile: any) => {
          this.userEmail = profile.email;
          success();
        }, err => {
          console.log("Profile retrieval error : " + err);
        });
      }, err => {
        console.log('Token retrieval error : ' + err);
      });
    }
  }
}
