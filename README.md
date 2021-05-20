# Account On It!

Being a property manager can be tough, especially when managing an apartment complex with plenty of nice people you want to keep happy,
and being a tenant on the hunt for a good place to rest your head that also won't break the bank can be even tougher. With these thoughts
in mind, I present to you, 'Account On It.' On one hand I'd love to provide property managers and landlords with the tools necessary
to keep their properties and residences running in tip-top shape. On the other, I want to provide tenants with an easy to use portal
to contact their landlord, keep track of rent, and foster a great landlord-tenant relationship. As a bonus, anyone looking for a new place
in a new city or for a place just down the freeway can find one here, a place with all-star reviews, reasonable rent, and a friendly community.

## Features So Far

-   Login
-   Listing Landlords' tenants & properties
-   Adding tenants and properties to a landlord's list
-   Tenants can view their property, landlord info, and their own info

## Coming Soon

-   Account Registration

## Features for the Future

-   Search Bar for tenants vs Search Bar for landlords
    -   Tenants can look up other properties as they approach the end of their lease as well as fellow tenants
    -   Landlords can look up their tenants, properties, and more.
-   Notify upcoming rent, upcoming leases ending
-   Property listings with reviews, rent estimates (can be exact prices too if preferred by property owner)

---

## In Regards to Testing - CURRENTLY UNRUNNABLE 

- Currently unable to run tests due to odd error, specifically 'TypeError: Object prototype may only be an Object or null: undefined'
  Unable to pin point the problem, but occurred after dependency update, so breaking changes were assumed. Have checked all dependencies,
  and after changing versions, problem still remains. Possibly webpack or laravel-mix issue?
    - @Testing-library/vue throws odd Typescript error, 'ts1005 missing comma' but when removed from tests, above error still occurs
- Mocha + MochaPack works pretty well when using Laravel-Mix (Tough to say if laravel-mix 6.0 will cause any trouble)
    - One potential issue, Setup. There's quite a few workarounds that take a bit of searching.
        - require('jsdom-global')() - Setups the DOM for mocha.
        - const file = require('laravel-mix/src/File'); global.File = file; - It's a weird Laravel mix problem (Maybe 6 fixed this?)
        - window.Date = Date() - Another weird issue with a weird fix. Something to do with webpack's template-loader.
    - On the other hand, enough messing with Jest may just get it to work!
        - Ultimately, Jest has continuous setup issues, but MOCKING system would like be better than mocha + ES6 import situation
- Expect (Jest's Assertion Library) is simple and straightforward but Chai may be better in this context
- Vue Test Utils are commonly suggested in articles; however, Vue Testing Library feels underappreciated. Since it's
  built on top of vue-test-utils, you get all the essentials. Even better, it means you are actually testing the things 
  the user will see, HTML elements on the DOM. 
- Inject-Loader can be pretty simple to mock dependencies (setting them aside to use simple callbacks or funcs)
    - The problem comes from it's lack of babel 7 support. The project has slowed since early 2020. BUT someone has forked it
      so maybe one day, it'll be merged or the fork will become it's own package altogether.
    - Current solution: '@babel/plugin-transform-modules-commonjs' to translate ES6 modules for inject-loader. Adding a .babelrc
      file with the following line '"plugins": ["@babel/plugin-transform-modules-commonjs"]' will merge right into laravel-mix fixing things
    - BUT Sinon actually does provide quite a bit of options for mocking away dependencies so it's a great choice to handle some mocking!
        - Sinon.fake, Sinon.spy, Sinon.server and way more for globals and direct dependencies (not ES6 imports)
    - Alternatives: Rewire, Proxyquire, REWIREMOCK!
        - Big issue is a huge stalling on all these projects except for Rewiremock which just needs figuring out (due to bad documentation)
- RewireMock is incredibly powerful by embracing Proxyquire, Mockery and Jest, and unlike Proxyquire (and most commonly used JS mocking libraries),
  it works with ES6 imports, embracing the modern way of writing JS. Decent examples in resources/js/Tests/Unit/Vue-Router/Helpers.spec.js
    - Since the documentation is pretty bad, any setup or helpful info will probably be placed here, and ideally can one day be merged into the repo
    - SETUP: Either use a setup file that exports a preconfigured rewiremock obj OR directly use "import rewiremock" from either 'rewiremock/node' 
      or 'rewiremock/webpack depending on if you're using webpack or basic node
      ```
      // rewire-setup.js
      import rewiremock from "rewiremock/webpack"
      rewiremock.overrideEntryPoint(module);
      export default rewiremock;
      ```
      ```
      // test.spec.js
      import rewiremock from "rewire-setup.js"
      ```
    - USE: Since it provides 3 options (proxyquire, mockery, and jest), it's ultimately up to the user which is easiest to understand
        - Proxyquire version is the simplest since it requires the least setup despite having the full API available in the form of a callback
          - Only plugin that seems useful for this version is the 'relative'. Add `addPlugin(plugins.webpackAlias);` line to rewire-setup.js to 
            ensure rewiremock only overrides first-level of dependencies (so it won't break too much)
            - Doing `rewire.proxy("fileNameBeingTestedRelative to spec.js file").atAnyPlace()` will override it for that one call
          - Basic Usage: rewiremock.proxy("fileToTestPath", { "fileToTestDependency1Path": { defaultExport: stub, namedExportName: stub } })
            All file paths are written relative to fileToTest.spec file, NOT the fileToTest file (which I think proxyquire would do)
          ```
          // resources/src/exportFile.js
          export function namedImport() { return "NamedImport" }
          export default function defaultExport() {}
          ```
          ```
          // resources/src/fileToTest.js
          import defaultExport, {namedImport} from "./exportFile";
          export function testFunc() { defaultExport(); return namedImport();}
          ```
          ```
          // resources/test/fileToTest.spec.js
          import sinon from "sinon";
          import rewiremock from "./rewiremock-setup";
          describe("Testing function", () => {
            it("tests the function", () => {
              const namedImportStub = sinon.stub().returns("NamedImportStub");
              const fileToTest = rewiremock.proxy("../src/fileToTest", 
                {"../src/fileToTest": { default: sinon.stub(), "namedImport": namedImportStub } })
              const returnVal = fileToTest.testFunc();
              expect(returnVal).toBe("namedImportStub");
            })
          })
          ```
        - Jest version requires a babel plugin so on top of the above setup be sure to include the following in a babel.config.js or .babelrc
          - When using laravel-mix use '.babelrc' because it seems that's their preference.
          ```
          // .babelrc
          {
            'plugins': [ 'rewiremock/babel' ]
          }

## Formatting
Originally attempted to follow basic Prettier formatting, but it wasn't perfect. Normally, I might just leave it, but 
in an attempt to better understand the options out there, I went digging into prettier, vetur and most recently js-beautify.

- Prettier -> Incredibly opinionated and relatively new option with a couple of configuration options that can make things a bit prettier. 
Certainly a good standard that solves the problem of getting a team organized quickly, but until you get to the point where you can 
ignore the bits you don't like it leaves a lot to be desired.
- Vetur -> Bakes Prettier right into Vue files, specifying exactly which part of the prettier system will handle each section of 
a Vue Single File Component. Works really great but since it abstracts all the prettifying can be tough to modify, in particular
when using js-beautify-html as an option for js, css, or html.
- Beautify -> Considered an older way of handling formatting across html, js and css, BUT has a range of options to cater to one's taste.
For this reason, it has a learning curve that could be offputting compared to Prettier's set & forget feel. Since Vetur allows it
though, it's easily set in VSCode's user settings or project settings through vetur.format.defaultFormatter & vetur.format.defaultFormatterOptions
      - Once setup in Vetur settings, they're default settings take care of the rest; HOWEVER, make a note of their defaults on their git repo
      at vetur/server/src/modes/template/service/html since you may need to override their choices.
          - To override: You CANNOT use a .jsbeautifyrc. You must use VSCode's vetur settings at the user, workspace or project level
          - If you want to include .jsbeautifyrc, it'd probably be useful to share across team since VSCode's Beautify extension
          will still notice it and follow it when using the VSCode command palette 
              - As opposed to the format on save option which is also available from the command palette
              - The .jsbeautifyrc file included here matches my VSCode settings and it 
              follows Vetur's recommendations EXCEPT wrap_attributes where I changed it to "auto"

---

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

-   [Simple, fast routing engine](https://laravel.com/docs/routing).
-   [Powerful dependency injection container](https://laravel.com/docs/container).
-   Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
-   Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
-   Database agnostic [schema migrations](https://laravel.com/docs/migrations).
-   [Robust background job processing](https://laravel.com/docs/queues).
-   [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 1500 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
