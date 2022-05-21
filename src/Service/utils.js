import { Subject } from "rxjs";
export default class Utils {
  static Logout = new Subject();
  static Toast = new Subject();
  static sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }
  static beautifyCamelCase(val) {
    return val
      .split(/-|_| /)
      .filter(String)
      .map((v) => `${v[0].toUpperCase()}${v.slice(1)}`)
      .join(" ");
  }
  static getCookie(name) {
    return document.cookie.split(`${name}=`)[1]?.split(";")?.[0]?.trim() || "";
  }
}
