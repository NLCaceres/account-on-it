import { mutations } from '@/Store/modules/AppState';

describe('Vuex App Module Mutations', () => {
  it('checks if loading status has been updated ', () => {
    const state = { loading: false };
    mutations.LOAD(state, true);
    expect(state.loading).toBe(true);
  });
  it('checks if saving status has been updated ', () => {
    const state = { saving: false };
    mutations.SAVE(state, true);
    expect(state.saving).toBe(true);
  });
  it('checks if error status has been updated ', () => {
    const state = { errMsg: 'foo err' };
    mutations.ERROR(state, 'new foo err');
    expect(state.errMsg).toBe('new foo err');
  });
  it('updates window height', () => {
    const state = { window: { height: 10 } };
    mutations.UPDATE_HEIGHT(state, 11);
    expect(state.window.height).toBe(11);
  });
  it('updates window width', () => {
    const state = { window: { width: 10 } };
    mutations.UPDATE_WIDTH(state, 11);
    expect(state.window.width).toBe(11);
  });
  it('update recaptcha score of user', () => {
    const state = { recaptchaScore: 0.0 };
    mutations.UPDATE_RECAPTCHA_SCORE(state, 0.7);
    expect(state.recaptchaScore).toBe(0.7);
  });
  it('sets current browser accepted page visibility object', () => {
    const state = { websiteVisibility: { hidden: 'none', visibilityChange: 'none'} };
    const newVisibilityState = { hidden: 'hidden', visibilityChange: 'visibilitychange'}
    mutations.SET_PAGE_VISIBILITY_API(state, newVisibilityState);
    expect(state.websiteVisibility).toStrictEqual(newVisibilityState);
  });
});