import { vi } from "vitest";
import { UpdateRecaptchaVisibility, UpdateTitle, UpdateTransitionEffect } from "@/Routes/GlobalAfterGuards";
import { RECAPTCHA_REQUIRED } from "@/Routes/MetaTags";
import { type RouteLocationNormalized, type RouteMeta } from "vue-router";

const routeCreator = (path: string, routeMeta: Partial<RouteMeta>): RouteLocationNormalized => { 
  return {
    path, meta: { authRequirement: "NO_AUTH_NEEDED", verificationRequirement: "NO_VERIFICATION_NEEDED", ...routeMeta },
    fullPath: path, matched: [], hash: "", params: { }, query: { }, redirectedFrom: undefined, name: undefined
  }
};

describe("Vue Router Helper functions for the Global AfterEach Guard", () => {
  it("handling visibility of a Recaptcha block, showing it when a 'RECAPTCHA_REQUIRED' meta tag is present", () => {
    const jQueryToggle = vi.spyOn($.prototype, "toggle");
    //* WHEN UpdateRecaptcha helper called with expected `RECAPTCHA_REQUIRED` meta tag
    const toWithRecaptcha = routeCreator("", { recaptchaRequirement: RECAPTCHA_REQUIRED });
    UpdateRecaptchaVisibility(toWithRecaptcha, routeCreator("", { }));
    expect(jQueryToggle).toHaveBeenCalledOnce(); //* THEN jQuery toggled called ONCE and with `true`
    expect(jQueryToggle).toHaveBeenCalledWith(true);

    const toPathWithoutRecaptcha = routeCreator("", { });
    expect(toPathWithoutRecaptcha.meta.recaptchaRequirement).toBeUndefined();
    //* WHEN the `toPath` has an undefined recaptchaRequirement, THEN the jqueryToggle will not fire
    UpdateRecaptchaVisibility(toPathWithoutRecaptcha, routeCreator("", { })); //* Both `to` and `from` have recaptchaRequired === undefined
    expect(jQueryToggle).toHaveBeenNthCalledWith(2, false); //? 2nd call (i.e. not 0-indexed)

    const fromPathWithRecaptcha = routeCreator("", { recaptchaRequirement: "USE_RECAPTCHA" });
    expect(fromPathWithRecaptcha.meta.recaptchaRequirement).toBe("USE_RECAPTCHA");
    //* EVEN IF the `fromPath` had a "USE_RECAPTCHA" requirement, JUST the `toPath` is the determiner
    UpdateRecaptchaVisibility(toPathWithoutRecaptcha, fromPathWithRecaptcha);
    expect(jQueryToggle).toHaveBeenNthCalledWith(3, false); //? 3nd call
    expect(jQueryToggle).toHaveBeenCalledTimes(3);
  });

  it("updating the current document title to match the incoming `to` route", () => {
    const toPath = routeCreator("", { title: "Foobar" });
    //* WHEN the `to` route has the title "Foobar", THEN the doc will have "Foobar" as its title
    UpdateTitle(toPath, routeCreator("", { }))
    expect(document.title).toBe("Foobar");

    toPath.meta.title = "Barfoo"
    //* WHEN the `from` route has a title and `to` route has a title "Barfoo", THEN the doc will have the title "Barfoo"
    UpdateTitle(toPath, routeCreator("", { title: "Fizz" }));
    expect(document.title).toBe("Barfoo");

    toPath.meta.title = "";
    UpdateTitle(toPath, routeCreator("", { title: "Fizz" }));
    //* WHEN the `to` route has an empty string as its title, THEN the doc will default to the App Name set in `.env`
    expect(document.title).toBe("Account On It");

    //! Setting Vite's Env vars to undefined doesn't actually work, it just turns it into a string
    delete import.meta.env.VITE_APP_NAME; //? SO the solution is to delete the prop altogether
    toPath.meta.title = "";
    UpdateTitle(toPath, routeCreator("", { title: "Fizz" }));
    //* WHEN the `to` route has an empty string as its title AND no default is set, THEN the doc will use an empty string as its title
    expect(document.title).toBe(""); //! Otherwise setting it to undefined would make the doc title "undefined" in tests

    import.meta.env.VITE_APP_NAME = "Account On It"; //? Can't forget to reset the envVar though
    UpdateTitle(toPath, routeCreator("", { title: "Fizz" }));
    expect(document.title).toBe("Account On It"); //* Good sanity check to ensure VITE_APP_NAME was reset
  })
  describe("updating the transition while moving from one route to another", () => {
    it("applies a direction if 'slide' is used", () => {
      const toPathWithSlideTransition = routeCreator("", { transition: "slide" });
      UpdateTransitionEffect(toPathWithSlideTransition, routeCreator("", { }));
      //* WHEN "slide" is used as a transition, THEN the direction is calculated based on path depth
      //* In this case, BOTH paths are "", so a depth of 0 is used for both, resulting in a left slide
      expect(toPathWithSlideTransition.meta.transition).toBe("slide-left");

      const toDeepPath = routeCreator("/some/really/deep/path", { transition: "slide" });
      //* WHEN going `to` a deep path `from` a relatively shallow path, THEN a left slide will be used
      UpdateTransitionEffect(toDeepPath, routeCreator("/", { }));
      expect(toDeepPath.meta.transition).toBe("slide-left");

      const toShallowPath = routeCreator("/path", { transition: "slide" });
      //* WHEN going `to` a shallower path `from` a relatively deep path, THEN a right slide will be used
      UpdateTransitionEffect(toShallowPath, routeCreator("/some/deeper/path", { }));
      expect(toShallowPath.meta.transition).toBe("slide-right");

      const toHomePathSlideTransition = routeCreator("/", { transition: "slide" });
      //* WHEN "slide" is used going to the basic "/" home path, THEN the slide will ALWAYS be a right slide
      UpdateTransitionEffect(toHomePathSlideTransition, routeCreator("", { })); //* `From` has an empty path "" (effectively same as shallow path)
      expect(toHomePathSlideTransition.meta.transition).toBe("slide-right");
      const toHomePathSlideTransitionTwo = routeCreator("/", { transition: "slide" });
      UpdateTransitionEffect(toHomePathSlideTransitionTwo, routeCreator("/some/deep/path", { })); //* `From` has a deep path
      expect(toHomePathSlideTransition.meta.transition).toBe("slide-right");
    })
    it("applies the `to` path's transition, OR a fallback if no `to` path transition provided", () => {
      const toPath = routeCreator("", { transition: "flip" });
      //* WHEN a pre-defined transition is found on the `toPath`, THEN it is simply passed through unchanged
      UpdateTransitionEffect(toPath, routeCreator("", { }));
      expect(toPath.meta.transition).toBe("flip")

      const toPathWithoutTransition = routeCreator("/", { });
      const fromPathWithTransition = routeCreator("/path", { transition: "flip" });
      //* WHEN a `to` path has no transition BUT its `from` path does, THEN the `from` path's transition is used instead
      UpdateTransitionEffect(toPathWithoutTransition, fromPathWithTransition);
      expect(toPathWithoutTransition.meta.transition).toBe("flip")

      const toPathWithoutTransitionTwo = routeCreator("/", { });
      const fromPathWithSlideTransition = routeCreator("/path", { transition: "slide" });
      //* WHEN the `from` path transition replaces an undefined `to` path transition with a slide, THEN all slide direction logic applies
      UpdateTransitionEffect(toPathWithoutTransitionTwo, fromPathWithSlideTransition);
      expect(toPathWithoutTransitionTwo.meta.transition).toBe("slide-right"); //* Home path triggers a right slide as expected!

      const toPathWithoutAnyTransition = routeCreator("/", { });
      //* WHEN neither the `to` path NOR the `from` path have a transition, THEN the default transition will kick in
      UpdateTransitionEffect(toPathWithoutAnyTransition, routeCreator("/", { }));
      expect(toPathWithoutAnyTransition.meta.transition).toBe("fade"); //* Fade is the default transition across the app
    })
  })
})
