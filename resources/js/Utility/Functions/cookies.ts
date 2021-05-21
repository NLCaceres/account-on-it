//* Removes percent-encoding seen in URIs & extract individual cookies (';' separates full cookie string)
export const CookieList = (cookieString: string = window.document.cookie) => decodeURIComponent(cookieString).split(';'); 

export default function GetCookie(cookieName: string, valOnly: boolean = true, cookieList: string[] = CookieList()): string {
  for(var i = 0; i < cookieList.length; i++) {

    var cookie = cookieList[i];

    while (cookie.charAt(0) == ' ') { //? Trim whitespace between cookies in 'document.cookie'
      cookie = cookie.substring(1);
    }
    
    const fullCookieName = FullCookieName(cookieName);
    //* Check if this is the right cookie, either give the full k:v pair, or just the val
    if (cookie.indexOf(fullCookieName) === 0) {
      return valOnly ? cookie.substring(fullCookieName.length + 1, cookie.length) : cookie;
    }
  }
  return "";
}

export const FullCookieName = (cookieName: string) => (process.env.MIX_APP_NAME ?? 'account_on_it').toLowerCase().replace(/ /g, '_') + '_' + cookieName;

// @params: DaysToExpire: How many days until expiration     CookieName: snake_case to match app name prefix
// @params: Path: Defaults to '/' since most cookies end up on the root
export function AddCookie(daysToExpire: number, cookieName: string, cookieVal: string, path: string = '/'): string {
  var date = new Date();
  date.setTime(date.getTime() + (daysToExpire*24*60*60*1000)); //* 31 days to milliseconds - Standard. Longer if logged in
  var expires = "expires="+ date.toUTCString();
  
  //? Cookie vals can be lots of things, is there a right answer though? 
  const newCookie = FullCookieName(cookieName) + "=" + cookieVal + ";" + expires + ";path=" + path;
  window.document.cookie = newCookie;
  return newCookie.substring(0, newCookie.indexOf(';'));
}

export function DeleteCookie(cookieName: string, path: string = '/'): void {
  //* Simply get the cookie and change the expiration to an already past date;
  window.document.cookie = FullCookieName(cookieName) + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=' + path + ';';
}