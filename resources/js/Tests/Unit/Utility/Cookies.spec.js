import expect from 'expect';
import GetCookie, { AddCookie, CookieList, DeleteCookie, FullCookieName } from '../../../Utility/Functions/cookies'

//? Beware global vs regular document.cookie - Look the same but without global document.cookie CAN lose scope
describe('Cookies Utility Functions', () => {  
  it('sets the cookie name', () => {
    expect(FullCookieName('foobar')).toBe('account_on_it_foobar');
  })
  it('adds a cookie', () => {
    const newCookie = AddCookie(1, 'foobar', 'value');
    const cookieFound = GetCookie('foobar', false); 
    expect(newCookie).toBe(cookieFound);
  })
  it('gets a cookie', () => {
    AddCookie(1, 'foo', 'value');
    const cookie2 = AddCookie(1, 'bar', 'value');
    const cookieFound = GetCookie('bar', false); 
    expect(cookieFound).toBe(cookie2);
  })
  it('deletes a cookie', () => {
    AddCookie(1, 'boo', 'value');
    const cookie2 = AddCookie(1, 'far', 'value');
    const globalCookies = window.document.cookie; 
    DeleteCookie('far');
    expect(GetCookie('far', false)).toBeFalsy();
  })
});