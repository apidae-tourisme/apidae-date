import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";

@Injectable()
export class StylesService {
  public altBackground: string;
  public altColor: string;
  public mainBackground: string;
  public mainColor: string;
  public fontFamily: string;
  public headerImage: string;
  public wrapperClass: string;

  constructor() {
    this.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",' +
      ' sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
    this.mainBackground = '#ffffff';
    this.mainColor = '#665F51';
    this.altBackground = '#0089ce';
    this.altColor = '#ffffff';
    this.headerImage = 'url("./assets/img/logo_white.svg")';
    this.wrapperClass = environment['standalone'] ? 'apihours_standalone' : 'apihours_apidae';
  }

  get mainStyles() {
    return {backgroundColor: this.mainBackground, color: this.mainColor, fontFamily: this.fontFamily};
  }

  get headerStyles() {
    return {...this.altStyles, ...{backgroundImage: this.headerImage}};
  }

  get altStyles() {
    return {backgroundColor: this.altBackground, color: this.altColor, fontFamily: this.fontFamily, borderColor: this.altBackground};
  }

  get altOutlineStyles() {
    return {backgroundColor: this.mainBackground, color: this.altBackground, fontFamily: this.fontFamily, borderColor: this.altBackground};
  }

  get linkStyles() {
    return {backgroundColor: this.mainBackground, color: this.altBackground, fontFamily: this.fontFamily};
  }

  public loadStyles(customStyles): void {
    if (customStyles) {
      this.fontFamily = customStyles.fontFamily || this.fontFamily;
      this.mainBackground = customStyles.mainBackground || this.mainBackground;
      this.mainColor = customStyles.mainColor || this.mainColor;
      this.altBackground = customStyles.altBackground || this.altBackground;
      this.altColor = customStyles.altColor || this.altColor;
      this.headerImage = customStyles.headerImage || this.headerImage;
    }
  }
}
