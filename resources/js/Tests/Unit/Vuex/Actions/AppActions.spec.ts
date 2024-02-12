import { vi, type MockInstance } from "vitest";
import { actions } from '@/Store/modules/AppState';
import { ERROR, LOAD, SAVE, SET_PAGE_VISIBILITY_API, UPDATE_HEIGHT, UPDATE_RECAPTCHA_SCORE, UPDATE_WIDTH } from '@/Store/MutationTypes';
import * as PageVisibilityAPI from "@/Utility/Functions/page_visibility";

describe('Vuex app module actions', () => {
  it(`handles app-wide load state calling commit once each via the ${LOAD} mutation`, () => {
    const commit = vi.fn();
    const startLoadingState = true;

    actions.BEGIN_LOAD({ commit }, startLoadingState);

    expect(commit).toHaveBeenCalledOnce();
    expect(commit).toHaveBeenCalledWith(LOAD, startLoadingState);

    const endLoadingState = false;
    actions.BEGIN_LOAD({ commit }, endLoadingState);
    expect(commit).toHaveBeenCalledTimes(2)
    expect(commit).toHaveBeenLastCalledWith(LOAD, endLoadingState);
  })
  it("calls 'commit' to set app-wide save state", () => {
    const commit = vi.fn();
    const savingState = true;

    actions.BEGIN_SAVE({ commit }, savingState);

    expect(commit).toHaveBeenCalledWith(SAVE, savingState);
  })
  it("calls 'commit' to set app-wide error state", () => {
    const commit = vi.fn();
    const error = "error";

    actions.ERROR_OCCURRED({ commit }, error);

    expect(commit).toHaveBeenCalledOnce();
    expect(commit).toHaveBeenCalledWith(ERROR, error);
  })
  describe("calls 'commit' to set window dimensions", () => {
    it("calls commits on both width and height", () => {
      const commit = vi.fn();
      const state = { window: { width: 10, height: 10 } };

      actions.RESIZE_WINDOW({ commit, state });

      expect(commit).toHaveBeenCalledTimes(2);
    })
    it("calls neither height commit nor width commit if no resize", () => {
      //? Setting innerHeight/Width only works if followed by a dispatched 'resize' event!
      global.window.innerHeight = 10;
      global.window.innerWidth = 10;
      global.window.dispatchEvent(new Event('resize'));

      const commit = vi.fn();
      const state = { window: { width: 10, height: 10 } };

      actions.RESIZE_WINDOW({commit, state});

      expect(commit).not.toHaveBeenCalled();
      //* Not called if app's state dimensions match current window dimensions 
      //* Meaning no actual resize happened and no rerendering needed
    })
    it("calls only height commit due to only height resize", () => {
      global.window.innerHeight = 11; //* this height !== state.window.height
      global.window.innerWidth = 10; //* this width === state.window width, no width commit needed
      global.window.dispatchEvent(new Event('resize'));

      const commit = vi.fn();
      const state = { window: { width: 10, height: 10 } };

      actions.RESIZE_WINDOW({commit, state});

      expect(commit).toHaveBeenCalledOnce();
      expect(commit).toHaveBeenCalledWith(UPDATE_HEIGHT, global.window.innerHeight);
    })
    it("calls only width commit due to only width resize", () => {
      global.window.innerHeight = 10; //* this height === state.window.height, no height commit needed
      global.window.innerWidth = 11; //* this width !== state.window width
      global.window.dispatchEvent(new Event('resize'));

      const commit = vi.fn();
      const state = { window: { width: 10, height: 10 } };

      actions.RESIZE_WINDOW({commit, state});

      expect(commit).toHaveBeenCalledOnce();
      expect(commit).toHaveBeenCalledWith(UPDATE_WIDTH, global.window.innerWidth);
    })
  })
  it("calls 'commit' to set recaptcha score of user", () => {
    const commit = vi.fn();
    const score = 1.0;

    actions.CHANGE_RECAPTCHA_SCORE({ commit }, score);

    expect(commit).toHaveBeenCalledOnce();
    expect(commit).toHaveBeenCalledWith(UPDATE_RECAPTCHA_SCORE, score);
  })
  describe("handles init'ing page visibility api", () => {
    let initVisAPI: MockInstance;
    let visibilityReturn = { hidden: "hidden", visibilityChange: "visibilityChange" };
    let tabChangeCallback: MockInstance;
    let commit: MockInstance;
    beforeEach(() => { //* Set up spies / stubs
      initVisAPI = vi.spyOn(PageVisibilityAPI, "default");
      visibilityReturn = { hidden: 'hidden', visibilityChange: 'visibilitychange' };
      initVisAPI.mockReturnValue(visibilityReturn);
      commit = vi.fn();
      tabChangeCallback = vi.fn();
    });
    it("calls 'initVis' function", () => {
      actions.INIT_PAGE_VISIBILITY({commit}, tabChangeCallback);
      expect(initVisAPI).toHaveBeenCalledOnce();
      expect(initVisAPI).toHaveBeenCalledWith(tabChangeCallback);
    })
    it("calls 'commit' to set page visibility api", () => {
      actions.INIT_PAGE_VISIBILITY({commit}, tabChangeCallback);
      expect(commit).toHaveBeenCalledOnce();
      expect(commit).toHaveBeenCalledWith(SET_PAGE_VISIBILITY_API, visibilityReturn);
    })
  })
});