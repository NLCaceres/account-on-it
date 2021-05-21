import expect from 'expect';
import sinon from 'sinon';
import { actions } from '../../../../Store/modules/AppState';
import { ERROR, LOAD, SAVE, SET_PAGE_VISIBILITY_API, UPDATE_HEIGHT, UPDATE_RECAPTCHA_SCORE, UPDATE_WIDTH } from '../../../../Store/MutationTypes';
import * as PageVisibilityAPI from "../../../../Utility/Functions/page_visibility";

describe('Vuex app module actions', () => {
  describe('handle app wide load state', () => {
    it(`calls '${LOAD}' mutation once`, () => {
      const commit = sinon.spy(); //? If actually swapping a method (passing it to constructor), then restore() needed
      
      const loadingState = true;
  
      actions.BEGIN_LOAD({ commit }, loadingState);

      expect(commit.calledOnce).toBe(true);
    })
    it(`specifically calls the '${LOAD}' mutation`, () => {
      const commit = sinon.spy();
      const loadingState = true;

      actions.BEGIN_LOAD({commit}, loadingState);

      expect(commit.args[0][0]).toBe(LOAD); //? args prop is actually an array of calls, each that contain an array of arguments
      //? Above actually is commit.args[0] -> ["LOAD", true] meaning commit.args[0][0] -> "LOAD"
    })
    it(`uses load & loadingState args to call commit`, () => {
      const commit = sinon.spy();
      const loadingState = false;

      actions.BEGIN_LOAD({commit}, loadingState);

      expect(commit.calledWith(LOAD, loadingState)).toBe(true);
    })
  })
  it("calls 'commit' to set app wide save state", () => {
    const commit = sinon.spy();
    const savingState = true;

    actions.BEGIN_SAVE({commit}, savingState);

    expect(commit.calledOnceWithExactly(SAVE, savingState)).toBe(true);
  })
  it("calls 'commit' to set app wide error state", () => {
    const commit = sinon.spy();
    const error = "error";

    actions.ERROR_OCCURRED({commit}, error);

    expect(commit.calledOnceWithExactly(ERROR, error)).toBe(true);
  })
  describe("calls 'commit' to set window dimensions", () => {
    //* Params of 'RESIZE_WINDOW' changed since easier to test 
    //@params context: obj -> destructured @params { commit: func, state: obj }
    //* BUT could have just done something like
    //* const context = { commit: sinon.spy(), state: window: {width:10,height:10} }
    it("calls commits on both width and height", () => {
      const commit = sinon.spy();
      const state = {window: {width: 10, height: 10}}

      actions.RESIZE_WINDOW({commit, state});

      expect(commit.calledTwice).toBe(true);
    })
    it("calls neither height commit nor width commit if no resize", () => {
      //? Setting innerHeight/Width only works if followed by a dispatched 'resize' event!
      global.window.innerHeight = 10;
      global.window.innerWidth = 10;
      global.window.dispatchEvent(new Event('resize'));

      const commit = sinon.spy();
      const state = {window: {width: 10, height: 10}}

      actions.RESIZE_WINDOW({commit, state});

      expect(commit.notCalled).toBe(true); 
      //* Not called if app's state dimensions match current window dimensions 
      //* Meaning no actual resize happened and no rerendering needed
    })
    it("calls only height commit due to only height resize", () => {
      global.window.innerHeight = 11; //* this height != state.window.height
      global.window.innerWidth = 10; //* this width === state.window width, no width commit needed
      global.window.dispatchEvent(new Event('resize'));

      const commit = sinon.spy();
      const state = {window: {width: 10, height: 10}};

      actions.RESIZE_WINDOW({commit, state});

      expect(commit.calledOnceWithExactly(UPDATE_HEIGHT, global.window.innerHeight)).toBe(true);
    })
    it("calls only width commit due to only width resize", () => {
      global.window.innerHeight = 10; //* this height === state.window.height, no height commit needed
      global.window.innerWidth = 11; //* this width != state.window width 
      global.window.dispatchEvent(new Event('resize'));

      const commit = sinon.spy();
      const state = {window: {width: 10, height: 10}};

      actions.RESIZE_WINDOW({commit, state});

      expect(commit.calledOnceWithExactly(UPDATE_WIDTH, global.window.innerWidth)).toBe(true);
    })
  })
  it("calls 'commit' to set recaptcha score of user", () => {
    const commit = sinon.spy();
    const score = 1.0;
    actions.CHANGE_RECAPTCHA_SCORE({commit}, score);
    expect(commit.calledOnceWithExactly(UPDATE_RECAPTCHA_SCORE, score)).toBe(true);
  })
  describe("handles init'ing page visibility api", () => {
    let initVisAPI;
    let visibilityReturn;
    let tabChangeCallback;
    let commit;
    beforeEach(() => { //* Set up spies / stubs
      //? If function is ES6 default then it falls under that prop key name rather than it's actual name
      //? IMPORTANT: Sinon normally doesn't support "import * as moduleName from '../moduleName' "
      //? Seems to work here ONLY because it's the default export but named exports - 'export const funcName' don't seem to work
      initVisAPI = sinon.stub(PageVisibilityAPI, 'default');
      visibilityReturn = {hidden: 'hidden', visibilityChange: 'visibilitychange'};
      initVisAPI.returns(visibilityReturn);
      commit = sinon.spy();
      tabChangeCallback = sinon.spy();
    });
    afterEach(() => {
      initVisAPI.restore();
    });
    it("calls 'initVis' function", () => {
      actions.INIT_PAGE_VISIBILITY({commit}, tabChangeCallback);
      expect(initVisAPI.calledOnceWithExactly(tabChangeCallback));
    })
    it("calls 'commit' to set page visibility api", () => {
      actions.INIT_PAGE_VISIBILITY({commit}, tabChangeCallback);
      //? The hooks above need to be the each variants (beforeEach/afterEach vs before/after) or the following line fails. 
      //? Most likely because spies/stubs are not properly reset otherwise (meaning the commit spy actually got called twice! [maybe])
      expect(commit.calledOnceWithExactly(SET_PAGE_VISIBILITY_API, visibilityReturn)).toBe(true);
    })
  })
});