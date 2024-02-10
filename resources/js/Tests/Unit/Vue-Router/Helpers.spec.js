import { vi } from "vitest";
import { MainBeforeEachFn, CheckAuthRequirements, CheckVerificationRequirements } from "@/Routes/GlobalBeforeGuards";
import * as Store from "@/Store";
import { ADMIN_ONLY, LOGGED_IN_ONLY, LOGGED_OUT_ONLY, NO_AUTH_NEEDED, NO_VERIFICATION_NEEDED, VERIFIED_ONLY } from "@/Routes/MetaTags";
import { CHECK_AUTHENTICATION, CHECK_VERIFICATION, IS_ADMIN } from "@/Store/GetterTypes";
import { AUTH_MODULE } from "@/Store/modules/AuthenticationState";

//? These two constants and the routeCreator are just sanity helpers to ensure correct spelling/formatting every time
const verificationRequirement = "verificationRequirement";
const authRequirement = "authRequirement";
const routeCreator = (path = undefined, meta = undefined) => { return { path, meta: meta } };

describe('Vue Router functions for the Global BeforeEach Guard ', () => {
  describe("calls helper functions that return alternate routes when necessary", () => {
    it("like CheckAuth() redirecting to the login or original route if not properly authenticated/authorized", async () => { //? AuthN/AuthZ checks!
      const toPath = routeCreator("/toPath", { [authRequirement]: NO_AUTH_NEEDED, [verificationRequirement]: NO_VERIFICATION_NEEDED });
      const fromPath = routeCreator("/fromPath");
      //* WHEN the user is logged out and accessing a NO_AUTH path, THEN just allow the nav
      const allowEntry = await MainBeforeEachFn(toPath, fromPath);
      expect(allowEntry).toBe(true); //* Return true to indicate the nav can happen

      //* WHEN the user is logged out and accessing a LOGGED_OUT_ONLY path, THEN also just allow the nav
      toPath.meta.authRequirement = LOGGED_OUT_ONLY;
      const alsoAllowEntry = await MainBeforeEachFn(toPath, fromPath);
      expect(alsoAllowEntry).toBe(true);

      //* WHEN the user is logged out and accessing a LOGGED_IN_ONLY path, THEN redirect them to the login page
      toPath.meta.authRequirement = LOGGED_IN_ONLY;
      const redirectedToLogin = await MainBeforeEachFn(toPath, fromPath);
      expect(redirectedToLogin).toStrictEqual({ path: "/login" });

      //* WHEN the user is logged out and accessing an ADMIN_ONLY path, THEN return the user to their original route
      toPath.meta.authRequirement = ADMIN_ONLY;
      const redirectToOriginalRoute = await MainBeforeEachFn(toPath, fromPath);
      expect(redirectToOriginalRoute).toStrictEqual({ path: "/fromPath" });
    })
    it("like CheckVerification() redirecting the user back to their original route if user account is not properly verified", async () => {
      const toPath = routeCreator("/toPath", { [authRequirement]: NO_AUTH_NEEDED, [verificationRequirement]: NO_VERIFICATION_NEEDED });
      const fromPath = routeCreator("/fromPath");
      //* WHEN the user is not verified and accessing a NO_VERIFICATION_NEEDED path, THEN just allow the nav
      const allowEntry = await MainBeforeEachFn(toPath, fromPath);
      expect(allowEntry).toBe(true); //* Return true to indicate the nav can happen

      toPath.meta.verificationRequirement = VERIFIED_ONLY;
      //* WHEN the user is not verified and accessing a VERIFIED_ONLY path, THEN return the user back to their original route
      const forbidEntry = await MainBeforeEachFn(toPath, fromPath);
      expect(forbidEntry).toStrictEqual({ path: "/fromPath" });
    })
  })
  describe("handling verification, only allowing verified users access to routes that have a verification required meta tag", () => {
    let storeSpy;
    beforeEach(() => {
      storeSpy = vi.spyOn(Store, "default", "get").mockReturnValue({ getters: { [`${AUTH_MODULE}/${CHECK_VERIFICATION}`]: false } });
    });
    it("returns the 'toPath' if no verification needed OR if the user is verified", () => {
      storeSpy.mockReturnValue({ getters: { [`${AUTH_MODULE}/${CHECK_VERIFICATION}`]: true } });
      const toPathWithoutVerification = routeCreator("/toPathNotVerified", { [verificationRequirement]: NO_VERIFICATION_NEEDED });
      const nextPathNotVerified = CheckVerificationRequirements(toPathWithoutVerification, { })
      expect(nextPathNotVerified.path).toBe(toPathWithoutVerification.path);
      expect(storeSpy).not.toHaveBeenCalled(); //? Vuex Getters are not actually called, just read like any JS obj prop

      const toPathWithVerification = routeCreator("/toPathVerified", { [verificationRequirement]: VERIFIED_ONLY} );
      const nextPathVerified = CheckVerificationRequirements(toPathWithVerification, { });
      expect(nextPathVerified.path).toBe(toPathWithVerification.path);
    })
    it("returns the 'fromPath' if verification fails or if a route doesn't have an associated verification tag", () => {
      const to = routeCreator("/toPath");
      const from = routeCreator("/fromPath");

      //* No Meta tag
      const nextPathNoTag = CheckVerificationRequirements(to, from)
      expect(nextPathNoTag.path).toBe(from.path);

      //* No VerificationRequirement meta tag
      to.meta = {}
      const nextPathNoVerificationReq = CheckVerificationRequirements(to, from)
      expect(nextPathNoVerificationReq.path).toBe(from.path);

      //* Improper verificationRequirement 
      to.meta.verificationRequirement = "WRONG";
      const nextPathWrongVerificationReq = CheckVerificationRequirements(to, from);
      expect(nextPathWrongVerificationReq.path).toBe(from.path);

      //* Verification failed (since storeSpy mocked to return false)
      to.meta.verificationRequirement = VERIFIED_ONLY;
      const unverifiedUserPath = CheckVerificationRequirements(to, from);
      expect(unverifiedUserPath.path).toBe(from.path);
    })
  });
  describe("handling authentication routing, only authorizing authenticated users into gated routes", () => {
    let storeSpy;
    beforeEach(() => {
      storeSpy = vi.spyOn(Store, "default", "get")
        .mockReturnValue({ getters: { [`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`]: false, [`${AUTH_MODULE}/${IS_ADMIN}`]: false } });
    })

    it(`sends 'toPath' when no authentication required for routes tagged ${NO_AUTH_NEEDED}`, async () => {
      const to = routeCreator("/toPathNoAuth", { [authRequirement]: NO_AUTH_NEEDED });
      const nextPath = await CheckAuthRequirements(to, { })
      expect(nextPath.path).toBe(to.path);
    })

    describe(`for routes tagged ${LOGGED_OUT_ONLY}`, () => {
      it("sends 'toPath' only when logged out", async () => {
        const to = routeCreator("/toPathLoggedOut", { [authRequirement]: LOGGED_OUT_ONLY });
        const nextPath = await CheckAuthRequirements(to, { })
        expect(nextPath.path).toBe(to.path);
      });
      it("sends 'fromPath' when logged in", async () => {
        storeSpy.mockReturnValue({ getters: { [`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`]: true, [`${AUTH_MODULE}/${IS_ADMIN}`]: false } });
        const to = routeCreator("/toPathLoggedOut", { [authRequirement]: LOGGED_OUT_ONLY });
        const from = routeCreator("/fromPathLoggedIn");

        const nextPath = await CheckAuthRequirements(to, from)
        expect(nextPath.path).toBe(from.path);
      });
    });

    describe(`for routes tagged ${LOGGED_IN_ONLY}`, () => {
      it("sends '/login' path if not authenticated but trying to access auth only routes", async () => {
        const to = routeCreator("/toPathLoggedIn", { [authRequirement]: LOGGED_IN_ONLY });

        const nextPath = await CheckAuthRequirements(to, { })
        expect(nextPath.path).toBe('/login');
      });
      it("sends 'toPath' only when properly authenticated", async () => {
        storeSpy.mockReturnValue({ getters: { [`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`]: true, [`${AUTH_MODULE}/${IS_ADMIN}`]: false } });

        const to = routeCreator("/toPathLoggedIn", { [authRequirement]: LOGGED_IN_ONLY });

        const nextPath = await CheckAuthRequirements(to, { })
        expect(nextPath.path).toBe(to.path);
      });
      it("calls Vuex Store Dispatch to check auth ONLY if user reloads browser or coming from root", async () => {
        const dispatchSpy = vi.fn().mockResolvedValue("Logged in");
        storeSpy.mockReturnValue({ getters: { [`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`]: true, [`${AUTH_MODULE}/${IS_ADMIN}`]: false }, dispatch: dispatchSpy });

        const to = routeCreator("/toPathLoggedIn", { [authRequirement]: LOGGED_IN_ONLY });
        const from = routeCreator("/");

        await CheckAuthRequirements(to, { });
        expect(dispatchSpy).not.toHaveBeenCalled();

        await CheckAuthRequirements(to, from)
        expect(dispatchSpy).toHaveBeenCalledOnce();
      });
    });
    
    describe(`for routes tagged ${ADMIN_ONLY}`, () => {
      it("sends 'fromPath' when not properly authenticated as an admin", async () => {
        const to = routeCreator("/toPathAdminOnly", { [authRequirement]: ADMIN_ONLY });
        let from = routeCreator("/fromPathLoggedInNotAdmin");

        const nextPath = await CheckAuthRequirements(to, from)
        expect(nextPath.path).toBe(from.path);
      });
      it("sends 'toPath' only when properly authenticated as an admin", async () => {
        storeSpy.mockReturnValue({ getters: { [`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`]: true, [`${AUTH_MODULE}/${IS_ADMIN}`]: true } })
        const to = routeCreator("/toPathAdminOnly", { [authRequirement]: ADMIN_ONLY });

        const nextPath = await CheckAuthRequirements(to, { })
        expect(nextPath.path).toBe(to.path);
      });
      it("calls Vuex Store Dispatch to check auth ONLY if admin reloads browser or coming from root", async () => {
        const dispatchSpy = vi.fn().mockResolvedValue("Admin logged in");
        storeSpy.mockReturnValue({ getters: { [`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`]: true, [`${AUTH_MODULE}/${IS_ADMIN}`]: true }, dispatch: dispatchSpy })

        const to = routeCreator("/toPathAdminLoggedIn", { [authRequirement]: ADMIN_ONLY });
        const from = routeCreator("/");

        await CheckAuthRequirements(to, { });
        expect(dispatchSpy).not.toHaveBeenCalled();

        await CheckAuthRequirements(to, from)
        expect(dispatchSpy).toHaveBeenCalledOnce();
      });
    });
  });
});