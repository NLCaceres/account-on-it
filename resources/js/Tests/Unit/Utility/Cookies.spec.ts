import GetCookie, { AddCookie, CookieList, DeleteCookie, FullCookieName } from '../../../Utility/Functions/cookies'

//* List of Cookies made (All unique names to avoid test pollution): foo, fizz, foobar, fizzbuzz, bar, buzz, abc, def, cba, def

//? There are a lot of quirks with the Cookie system, especially during testing so note the "//?" comments
//? Beware global vs regular document.cookie - Look the same but without global document.cookie CAN lose scope
describe('Cookies Utility Functions', () => {
  it("concatenates expected cookie name with expected 'APP_NAME' env var", () => {
    //* By default, EnvVar is "Account On It", so it's lowercased, then whitespace becomes underscores and used to attach to cookieName
    expect(FullCookieName('foobar')).toBe('account_on_it_foobar');
    
    //* WHEN the cookie name is uppercased, THEN it remains untouched. Only the envVar is modified
    import.meta.env.VITE_APP_NAME = 'Fizz Buzz';
    expect(FullCookieName("Barfoo")).toBe("fizz_buzz_Barfoo");

    import.meta.env.VITE_APP_NAME="Account on It"; //* Reset the envVar
  })
  it('adds a cookie with an app name prefix', () => {
    //* WHEN adding a cookie, THEN receive the cookie name and value back
    const newCookie = AddCookie(1, "foo", "bar");
    expect(newCookie).toBe("account_on_it_foo=bar");
    //* WHEN checking the doc's cookies, THEN the cookie made ONLY will show its name and value, not expiration or path
    expect(window.document.cookie).toBe("account_on_it_foo=bar");

    //? Adding a slash in front of the 3rd arg (the path "fizz") seems to cause it to fail in testing
    const anotherCookie = AddCookie(10, "fizz", "buzz", "fizz"); //? BUT that's probably cause JSDOM is just imitating the real browser
    expect(anotherCookie).toBe("account_on_it_fizz=buzz");
    //* WHEN adding another cookie, THEN the doc's newest cookie is just added to the end of the list separated by a semi-colon
    expect(window.document.cookie).toBe("account_on_it_foo=bar; account_on_it_fizz=buzz");

    //* Cleanup
    DeleteCookie("foo", "/", true);
    DeleteCookie("fizz", "", true); //? Despite "setting" the path to "fizz" during creation, JSDom allows the deletion anyway! (See the delete test for more info)
  })
  it('deletes a cookie', () => {
    AddCookie(1, 'foobar', 'value');
    AddCookie(1, 'fizzbuzz', 'value', "fizz"); 
    //? In a real app, PATH is very important to ensure proper deletion occurs (PLUS it determines what routes get or can access the cookie)
    //? BUT in tests where JSDom is in control, Path seems always set to "/" behind the scenes and the value used during deletion doesn't really matter
    //? SO similarly to when adding a cookie during tests, DON'T prefix the path arg with "/" OR else JSDom seems to ignore adding/deleting the cookie
    DeleteCookie('fizzbuzz', "fizz", true);
    //* WHEN two cookies added, THEN one deleted, ONLY one will remain
    expect(CookieList()).toStrictEqual(["account_on_it_foobar=value"]);
    DeleteCookie('foobar', "value", true);
    //* WHEN both cookies added then deleted, THEN ONLY an empty array remains in CookieList
    expect(CookieList()).toStrictEqual([]);
  })
  it('gets a cookie with an option to use app name prefix', () => {
    AddCookie(1, 'abc', 'some_value');
    AddCookie(1, 'def', 'value');

    const noCookieFound = GetCookie('def', false); //* WHEN getting a cookie added via AddCookie()
    expect(noCookieFound).toBe(""); //* THEN the prefix is required or else no cookie will be returned

    const cookieFound = GetCookie('def', false, "account_on_it_"); //* WHEN getting a cookie added via AddCookie()
    expect(cookieFound).toBe("account_on_it_def=value"); //* THEN the prefix MUST be added as an arg of GetCookie() to retrieve the correct cookie
    //! Note that no semi-colon suffix is included with the returned cookie

    const foundOtherCookieValOnly = GetCookie("abc", true, "account_on_it_"); //* WHEN valueOnly expected
    expect(foundOtherCookieValOnly).toBe("some_value"); //* THEN no cookie name returned, just its simple value

    var date = new Date();
    date.setTime(date.getTime() + (1*24*60*60*1000));
    var expires = " expires="+ date.toUTCString();
    window.document.cookie = `cba=value; ${expires}; path=/`
    const nonAppCookieFound = GetCookie("cba", false);
    expect(nonAppCookieFound).toBe("cba=value");

    //* WHEN given some cookie string (and splitting it into a list via a "; " delimter for example)
    const randomCookieListCookie = GetCookie("fed", false, "", ["fed=some_other_value"]);
    expect(randomCookieListCookie).toBe("fed=some_other_value"); //* THEN can still find the cookie name and value
    const randomCookieListCookieValOnly = GetCookie("fed", true, "", ["fed=some_other_value"]);
    expect(randomCookieListCookieValOnly).toBe("some_other_value"); //* AND can isolate just the value as well!

    //* Cleanup
    DeleteCookie("abc", "", true);
    DeleteCookie("def", "", true);
    DeleteCookie("cba", "", false);
  })
  it("gets the full list of cookies", () => {
    //* WHEN a list of cookies input, THEN the list is decoded as a URI and split at the "; " points
    expect(CookieList("foo%3Dbar%3B%20fizz%3Dbuzz")).toStrictEqual(["foo=bar", "fizz=buzz"]);

    AddCookie(1, "bar", "foo");
    AddCookie(1, "buzz", "fizz");

    //* WHEN no param inserted, THEN the doc's cookie list is decoded by default and returned in a list
    expect(CookieList()).toStrictEqual(["account_on_it_bar=foo", "account_on_it_buzz=fizz"]);

    //* Cleanup
    DeleteCookie("bar", "", true);
    DeleteCookie("buzz", "", true);
    //! CookieList normally just gets `split()` into a single empty string, e.g. [""] BUT by checking for this condition
    expect(CookieList()).toStrictEqual([]); //* A simpler to understand result can be returned i.e. No cookies, THEN return an empty list
  })
});
