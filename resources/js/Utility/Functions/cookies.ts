//* Removes percent-encoding seen in URIs & extract individual cookies (';' separates full cookie string)
export const CookieList = (cookieString: string = window.document.cookie) => { 
  const allCookies = decodeURIComponent(cookieString).split('; ');
  return (allCookies.length === 1 && allCookies[0] === "") ? [] : allCookies;
}

export default function GetCookie(cookieName: string, valueOnly: boolean = true, prefix: string = "", cookieList: string[] = CookieList()): string {
  for (const cookie of cookieList) {
    const trimmedCookie = cookie.trim();
    const [name, value] = trimmedCookie.split("=");
    const expectedFullName = prefix + cookieName;
    const foundCorrectCookie = expectedFullName === name;
    if (valueOnly && foundCorrectCookie) { return value; }
    else if (foundCorrectCookie) { return trimmedCookie; }
  }
  return "";
}

//* Expecting "Account On It" from VITE_APP_NAME
export const ViteAppName = () => (import.meta.env.VITE_APP_NAME ?? "account_on_it") as string;
//* THEN turning it into "account_on_it_"
export const AppNamePrefix = () => ViteAppName().toLowerCase().replace(/ /g, '_') + '_'

export const FullCookieName = (cookieName: string) => AppNamePrefix() + cookieName;

// @params: DaysToExpire: How many days until expiration     CookieName: snake_case to match app name prefix
// @params: Path: Defaults to '/' since most cookies end up on the root
export function AddCookie(daysToExpire: number, cookieName: string, cookieVal: string, path: string = '/'): string {
  var date = new Date();
  date.setTime(date.getTime() + (daysToExpire*24*60*60*1000)); //* Convert the days to milliseconds - 31 Days is fairly standard. Maybe shorter for logins?
  var expires = " expires="+ date.toUTCString();
  
  //? Cookie vals can be lots of things, is there a right answer though? 
  const newCookie = FullCookieName(cookieName) + "=" + cookieVal + ";" + expires + "; path=" + path;
  window.document.cookie = newCookie;
  return newCookie.substring(0, newCookie.indexOf(';'));
}

export function DeleteCookie(cookieName: string, path: string = '/', appDefined = false): void {
  const finalCookieName = (appDefined) ? FullCookieName(cookieName) : cookieName;
  //* Simply get the cookie and change the expiration to an already past date;
  window.document.cookie = finalCookieName + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=' + path + ';';
}