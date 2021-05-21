// import RenderWithSetup from '../../../render';
// import SuiNav from '../../../../Components/Elements/SuiNavBar/SuiNav.vue';
// import HomePage from '../../../../Views/Home/HomePage.vue';
// import NotFound from '../../../../Components/GenericViews/NotFound.vue';

// const routes = [
//   {
//     path: "/",
//     name: "Home",
//     components: {
//       wide: HomePage
//     }
//   },
//   {
//     path: "/not-found",
//     name: "404",
//     component: NotFound
//   },
//   { path: "*", redirect: "/not-found" }
// ]

// const AppWindowSizing = (width, height) => { 
//   return { modules: { app: {state: { window: { width: width, height: height }}}} };
// };

// describe('Semantic UI Navbar Component', () => {
//   const stubs = { stubs: ['router-link', 'sui-input', 'basic-header'] }
//   it('with basic mobile rendering', () => {
//     const { html } = RenderWithSetup(SuiNav, {}, stubs, {}, AppWindowSizing(767, 449), routes);
//     expect(html()).toMatch('mobile-nav');
//   })
//   describe('with basic desktop rendering', () => {
//     it('at proper height and width', () => {
//       const { html } = RenderWithSetup(SuiNav, {}, stubs, {}, AppWindowSizing(770, 451), routes);
//       expect(html()).toMatch('desktop-nav');
//     })
//     it('not when too short', () => {
//       const { html } = RenderWithSetup(SuiNav, {}, stubs, {}, AppWindowSizing(769, 449), routes);
//       expect(html()).not.toMatch('desktop-nav')
//     })
//     it('not when too thin', () => {
//       const { html } = RenderWithSetup(SuiNav, {}, stubs, {}, AppWindowSizing(767, 451), routes);
//       expect(html()).not.toMatch('desktop-nav');
//     })
//   })
// });