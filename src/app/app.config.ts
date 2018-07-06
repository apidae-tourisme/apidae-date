import {Params} from "@angular/router";
import {InjectionToken} from "@angular/core";

export const INIT_PARAMS = new InjectionToken<Params>('initParams');
export const DEFAULT_STATE = new InjectionToken<string[]>('defaultState');
export const DB_URL = '';

export const OAUTH_REDIRECT_URL = '';
export const OAUTH_AUTH_URL = '';
export const OAUTH_TOKEN_URL = '';
export const OAUTH_PROFILE_URL = '';
export const OAUTH_CLIENT_ID = '';
export const OAUTH_SECRET = '';
