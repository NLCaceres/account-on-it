# Account On It!

Being a property manager can be tough, especially when managing plenty of apartments with plenty of nice people you want to keep happy;
Being a tenant on the hunt for a nice place to rest your head without breaking the bank can be even tougher. To combat these concerns,
I present to you, 'Account On It.' On one hand I want to provide property managers and landlords with the tools necessary to keep their
properties and residences running in tip-top shape. On the other, I want to provide tenants with an easy to use portal to contact their landlord,
keep track of rent, and foster a great landlord-tenant relationship. PLUS, for those looking for a new place in a new city or even just a
a new place down the street, they can find one through Account On It, a place with all-star reviews, reasonable rent, and a friendly community.


## Features So Far

- Login
- Listing Landlords' tenants & properties with pagination
- Adding tenants and properties to a landlord's list
- Tenants can view their property, landlord info, and their own info


## Coming Soon

- Account Registration


## Features for the Future

- Search Bar for tenants vs Search Bar for landlords
  - Tenants can look up other properties as they approach the end of their lease as well as fellow tenants
  - Landlords can look up their tenants, properties, and more.
- Notify upcoming rent, upcoming leases ending
- Property listings with reviews, rent estimates (or exact prices if preferred by property owner)


---

## Considerations for the backend

- Using Nested Resources can not only make the API more SOLID (in particular, by giving various routes a single responsibility/focus) BUT
it can also better leverage Laravel's authorization features and prevent over-querying
  - A helpful set of examples: "https://github.com/adamwathan/laracon2017/pull/1"

---

## Front-End Testing

- Vite + Vitest working well with Vue-3 has fixed major issues related to creating mocks and using Typescript across the project
  - BEFORE:
    - Mocha + Webpack would use inject-loader to create mocks BUT the API was very cumbersome and inflexible, only allowing a single mock
    and only for basic Javascript files, not Typescript ones.
      - Consequently, it necessitated a lot of extra dependencies as well as Sinon for spies BUT nothing seemed powerful enough
  - CONSIDERED:
    - Jest, while much better from a technical standpoint at handling mocks, didn't play well with Vue, since it defaults to mocking everything
    including basic components that `@testing-library/vue` was searching for.
  - NOW:
    - Given Vitest's connection to Vue and Jest, it handles mocking and Vue SFCs much better, all without needing to change very much from my
    current unit tests.
      - Mocks are very simple to implement, having a similar syntax/feel to Jest or Sinon
      - Vue SFCs load all components exactly as the front-end does in the Browser, and it loads jsdom by default

- Vue Test Utils are commonly suggested in articles; however, Vue Testing Library feels underappreciated. Since it's
  built on top of vue-test-utils, you get all the essentials. Even better, it means you are actually testing the things 
  the user will see, HTML elements on the DOM, rather than implementation details


## Formatting

Originally attempted to follow basic Prettier formatting, but it wasn't perfect. Normally, I might just leave it, but 
in an attempt to better understand the options out there, I went digging into prettier, vetur, js-beautify, and now ESLint-Stylistic

- Prettier
  - Incredibly opinionated and relatively popular option with a couple of configuration options that can make things a bit prettier. 
  Certainly a good standard that solves the problem of getting a team organized quickly, but until you get to the point where you can 
  ignore the bits you don't like it leaves a lot to be desired.
- Vetur
  - Bakes Prettier right into Vue files, specifying exactly which part of the prettier system will handle each section of 
  a Vue Single File Component. Works really great but since it abstracts all the prettifying can be tough to modify, in particular
  when using js-beautify-html as an option for js, css, or html.
  - Now deprecated with Volar taking over, which does not include prettier or ESLint
- Beautify
  - Considered an older way of handling formatting across html, js and css, BUT has a range of options to cater to one's taste.
  For this reason, it has a learning curve that could be offputting compared to Prettier's set & forget feel. 
- **ESLint Stylistic - likely the best of both linting and formatting baked into one convenient family of devDependenciess**
  - ESLint is simply put, a Linter, a tool for identifying and reporting potential logic, usage or naming errors in Javascript code with the
  goal of making code consistent and bug-free.
  - BEFORE: This left a space for dedicated formatters to enforce their own code style; however,
  ESLint maintained its own formatting rules if a developer preferred to use ESLint's formatter (despite its slower speed)
  - NOW: ESLint has deprecated its formatting rules in favor of splitting its formatter into another project named ESLint Stylistic.
  This new project is already nearly complete, and provides a tailor-made experience for developers to create their own coding style,
  perfectly suited to their projects' needs, rather than embrace a potentially less human-readable version with prettier or js-beautify

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
