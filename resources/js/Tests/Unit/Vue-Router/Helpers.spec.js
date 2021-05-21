import expect from "expect";
import sinon from "sinon";

import { IsRecaptchaVisible } from "../../../Routes/GlobalBeforeGuards";
import rewiremock from "rewiremock/webpack";
import merge from 'lodash/merge';
import cloneDeep from "lodash/cloneDeep";

import { ADMIN_ONLY, LOGGED_IN_ONLY, LOGGED_OUT_ONLY, NO_AUTH_NEEDED, NO_VERIFICATION_NEEDED, RECAPTCHA_REQUIRED, VERIFIED_ONLY } from "../../../Routes/MetaTags";
import { CHECK_AUTHENTICATION, CHECK_VERIFICATION, IS_ADMIN } from "../../../Store/GetterTypes";
import { AUTH_MODULE } from "../../../Store/modules/AuthenticationState";

const recaptchaRequirement = "recaptchaRequirement";
const verificationRequirement = "verificationRequirement";
const authRequirement = "authRequirement";
const routeCreator = (path = undefined, meta = undefined) => {return { path, meta: meta }};

describe('Vue Router Helper Functions', () => {
  describe('that run in Global Before Each', () => {
    describe('Handling visibility of recaptcha block, only showing when used', () => {
      let jQueryToggle; 
      beforeEach(() => {
        jQueryToggle = sinon.stub($.prototype, "toggle");
      });
      afterEach(() => {
        jQueryToggle.restore();
      });
      it("displays recaptcha when it's needed", () => {
        const toWithRecaptcha = routeCreator(undefined, {[recaptchaRequirement]: RECAPTCHA_REQUIRED});
        IsRecaptchaVisible(toWithRecaptcha, {});
        sinon.assert.calledOnceWithExactly(jQueryToggle, true);
      })
      it("hides recaptcha if wrong meta tag or missing", () => {
        const toWithoutRecaptcha = routeCreator(undefined, {});
        IsRecaptchaVisible(toWithoutRecaptcha, {});
        sinon.assert.calledWithExactly(jQueryToggle.firstCall, false);
        toWithoutRecaptcha.meta.recaptchaRequirement = "Wrong";
        IsRecaptchaVisible(toWithoutRecaptcha, {});
        sinon.assert.calledWithExactly(jQueryToggle.secondCall, false);
      });
    });
    describe("Handling verification, only allowing verified users access to routes that have a verification required meta tag", () => {
      let verificationGetter; let helperVerificationFile;
      beforeEach(() => {
        verificationGetter = sinon.stub();
        helperVerificationFile = rewiremock.proxy("../../../Routes/GlobalBeforeGuards", 
          {"../../../Store": { default: { getters: { [`${AUTH_MODULE}/${CHECK_VERIFICATION}`]: verificationGetter } } }});
        rewiremock.enable();
      });
      afterEach(() => {
        rewiremock.disable();
      })
      it("returns the toPath ONLY when user properly verified or no verification needed", () => {
        const toPathWithVerification = routeCreator("/toPathVerified", {[verificationRequirement]: VERIFIED_ONLY});
        const nextPathVerified = helperVerificationFile.CheckVerificationRequirements(toPathWithVerification, {});
        expect(nextPathVerified).toBe(toPathWithVerification);

        const toPathWithoutVerification = routeCreator("/toPathNotVerified", {[verificationRequirement]: NO_VERIFICATION_NEEDED});
        const nextPathNotVerified = helperVerificationFile.CheckVerificationRequirements(toPathWithoutVerification, {})
        expect(nextPathNotVerified).toBe(toPathWithoutVerification);
      })
      it("returns the fromPath by default or when missing verification", () => {
        const to = routeCreator("/toPath");
        const from = routeCreator("/fromPath");

        //* No Meta tag
        const nextPathNoTag = helperVerificationFile.CheckVerificationRequirements(to, from)
        expect(nextPathNoTag).toBe(from);

        //* No VerificationRequirement meta tag
        to.meta = {}
        const nextPathNoVerificationReq = helperVerificationFile.CheckVerificationRequirements(to, from)
        expect(nextPathNoVerificationReq).toBe(from);

        //* Improper verificationRequirement 
        to.meta.verificationRequirement = "WRONG";
        const nextPathWrongVerificationReq = helperVerificationFile.CheckVerificationRequirements(to, from);
        expect(nextPathWrongVerificationReq).toBe(from);
      })
      it(`doesn't actually call '${AUTH_MODULE}/${CHECK_VERIFICATION}' getter for user, it's cached!`, () => {
        const to = routeCreator("/toPath", { [verificationRequirement]: VERIFIED_ONLY });
        const nextPath = helperVerificationFile.CheckVerificationRequirements(to, {});
        //? Getters aren't actually called so checking if called fails
        sinon.assert.notCalled(verificationGetter);
      })
    });
    describe("Handling authentication routing, only authorizing authenticated users into gated routes", () => {
      const gettersMock = {"../../../Store": { default: { getters: 
        { [`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`]: false, [`${AUTH_MODULE}/${IS_ADMIN}`]: false } }} };

      beforeEach(() => {
        // rewiremock("../../../Routes/GlobalBeforeGuards").callThrough({"../../../Store": { default: 
        //   { getters: { [`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`]: "Message", [`${AUTH_MODULE}/${IS_ADMIN}`]: false }}}});
        // rewiremock.enable(); //? Seemingly only used for jest-like version
      })
      afterEach(() => {
        // rewiremock.disable(); //? Also seemingly only used for jest-like version
      })

      it(`sends toPath when no authentication required for routes tagged ${NO_AUTH_NEEDED}`, async () => {
        const to = routeCreator("/toPathNoAuth", { [authRequirement]: NO_AUTH_NEEDED });
        const helpersAuthFile = rewiremock.proxy("../../../Routes/GlobalBeforeGuards", gettersMock);
        const nextPath = await helpersAuthFile.CheckAuthRequirements(to, {})
        expect(nextPath).toBe(to);
      })

      describe(`for routes tagged ${LOGGED_OUT_ONLY}`, () => {
        const to = routeCreator("/toPathLoggedOut", { [authRequirement]: LOGGED_OUT_ONLY });
        it("sends toPath only when logged out", async () => {
          const helpersAuthFile = rewiremock.proxy("../../../Routes/GlobalBeforeGuards", gettersMock);
          const nextPath = await helpersAuthFile.CheckAuthRequirements(to, {})
          expect(nextPath).toBe(to);
        });
        it("sends fromPath when logged in", async () => {
          const from = routeCreator("/fromPathLoggedIn");
          gettersMock['../../../Store'].default.getters[`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`] = true;
          const helpersAuthFile = rewiremock.proxy("../../../Routes/GlobalBeforeGuards", gettersMock);
          const nextPath = await helpersAuthFile.CheckAuthRequirements(to, from)
          expect(nextPath).toBe(from);
        });
      });

      describe(`for routes tagged ${LOGGED_IN_ONLY}`, () => {
        it("sends '/login' path if not authenticated but trying to access auth only routes", async () => {
          gettersMock["../../../Store"].default.getters[`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`] = false; 
          gettersMock["../../../Store"].default.getters[`${AUTH_MODULE}/${IS_ADMIN}`] = false;

          const to = routeCreator("/toPathLoggedIn", { [authRequirement]: LOGGED_IN_ONLY });
          const helpersAuthFile = rewiremock.proxy("../../../Routes/GlobalBeforeGuards", gettersMock);
          const nextPath = await helpersAuthFile.CheckAuthRequirements(to, {})
          expect(nextPath.path).toBe('/login');
        });
        it("sends toPath only when properly authenticated", async () => {
          gettersMock["../../../Store"].default.getters[`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`] = true; 
          gettersMock["../../../Store"].default.getters[`${AUTH_MODULE}/${IS_ADMIN}`] = false;

          const to = routeCreator("/toPathLoggedIn", { [authRequirement]: LOGGED_IN_ONLY });
          const helpersAuthFile = rewiremock.proxy("../../../Routes/GlobalBeforeGuards", gettersMock);
          const nextPath = await helpersAuthFile.CheckAuthRequirements(to, {})
          expect(nextPath).toBe(to);
        });
        it("calls Vuex Store Dispatch to check auth ONLY if user reloads browser or coming from root", async () => {
          const dispatchSpy = sinon.stub().resolves("Logged in");
          gettersMock["../../../Store"].default.getters[`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`] = true; 
          gettersMock["../../../Store"].default.getters[`${AUTH_MODULE}/${IS_ADMIN}`] = false;
          gettersMock["../../../Store"].default.dispatch = dispatchSpy;

          const to = routeCreator("/toPathLoggedIn", { [authRequirement]: LOGGED_IN_ONLY });
          const from = routeCreator("/");

          const helpersAuthFile = rewiremock.proxy("../../../Routes/GlobalBeforeGuards", gettersMock);

          await helpersAuthFile.CheckAuthRequirements(to, {});
          sinon.assert.notCalled(dispatchSpy);
          await helpersAuthFile.CheckAuthRequirements(to, from)
          sinon.assert.calledOnce(dispatchSpy);
        });
      });
      
      describe(`for routes tagged ${ADMIN_ONLY}`, () => {
        it("sends fromPath when not properly authenticated as an admin", async () => {
          gettersMock["../../../Store"].default.getters[`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`] = false; 
          gettersMock["../../../Store"].default.getters[`${AUTH_MODULE}/${IS_ADMIN}`] = false;
          const to = routeCreator("/toPathAdminOnly", { [authRequirement]: ADMIN_ONLY });
          let from = routeCreator("/fromPathLoggedInNotAdmin");
          const helpersAuthFile = rewiremock.proxy("../../../Routes/GlobalBeforeGuards", gettersMock);
          const nextPath = await helpersAuthFile.CheckAuthRequirements(to, from)
          expect(nextPath).toBe(from);
        });
        it("sends toPath only when properly authenticated as an admin", async () => {
          gettersMock["../../../Store"].default.getters[`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`] = true; 
          gettersMock["../../../Store"].default.getters[`${AUTH_MODULE}/${IS_ADMIN}`] = true;
          const to = routeCreator("/toPathAdminOnly", { [authRequirement]: ADMIN_ONLY });
          const helpersAuthFile = rewiremock.proxy("../../../Routes/GlobalBeforeGuards", gettersMock);
          const nextPath = await helpersAuthFile.CheckAuthRequirements(to, {})
          expect(nextPath).toBe(to);
        });
        it("calls Vuex Store Dispatch to check auth ONLY if admin reloads browser or coming from root", async () => {
          const dispatchSpy = sinon.stub().resolves("Admin logged in");
          gettersMock["../../../Store"].default.getters[`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`] = true; 
          gettersMock["../../../Store"].default.getters[`${AUTH_MODULE}/${IS_ADMIN}`] = true;
          gettersMock["../../../Store"].default.dispatch = dispatchSpy;

          const to = routeCreator("/toPathAdminLoggedIn", { [authRequirement]: ADMIN_ONLY });
          const from = routeCreator("/");

          const helpersAuthFile = rewiremock.proxy("../../../Routes/GlobalBeforeGuards", gettersMock);

          await helpersAuthFile.CheckAuthRequirements(to, {});
          sinon.assert.notCalled(dispatchSpy);
          await helpersAuthFile.CheckAuthRequirements(to, from)
          sinon.assert.calledOnce(dispatchSpy);
        });
      });
    });
  });
});