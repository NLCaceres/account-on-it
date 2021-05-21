// import RenderWithSetup from '../../../render';
// import expect from 'expect';
// import SuiCard from '../../../../Components/Elements/Cards/SuiCard.vue';
// import LAZY_LOAD_OBSERVER from '../../../../Store/modules/IntersectionState';

// const IntersectionObserverVuexState = (observerList) => {
//   return { modules: { intersectionAPI: { state: { observers: { ...observerList }}}}};
// }

// describe('Semantic UI Card Component', () => {

//   describe('with basic card with a basic info item', () => {
//     const props = {
//         infoItem: {
//           title: "FooTitle",
//           meta: "FooBarMeta",
//           description: "BarDescription",
//           img: {
//             src: 'FooImgSource',
//             alt: 'BarAltText'
//           }
//         }
//     };

//     it('checks the title rendered', () => {
//       const { getByText } = RenderWithSetup(SuiCard, props, {}, {}, 
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//       expect(getByText(props.infoItem.title)).toBeDefined();
//     })
//     it('checks the meta rendered', () => {
//       const { getByText } = RenderWithSetup(SuiCard, props, {}, {}, 
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//       expect(getByText(props.infoItem.meta)).toBeDefined();
//     })
//     it('checks the description rendered', () => {
//       const { getByText } = RenderWithSetup(SuiCard, props, {}, {}, 
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//       expect(getByText(props.infoItem.description)).toBeDefined();
//     })
  
//   })
//   describe('with standard slots to override appearance', () => {
//     const slots = {
//       slots: {
//         title: '<h1>FooTitle</h1>',
//         meta: '<h3>BarMeta</h3>',
//         description: '<p>FooBarDescription</p>',
//         'attached-button': '<i class="add icon"></i> FooButton',
//         footer: 'BarFooter'
//       }
//     }
//     it('checks title slot rendered', () => {
//       const { getByText, debug } = RenderWithSetup(SuiCard, {}, {}, slots,
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//       expect(getByText('FooTitle')).toBeDefined();
//     })
//     it('checks meta slot rendered', () => {
//       const { getByText } = RenderWithSetup(SuiCard, {}, {}, slots,
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//       expect(getByText('BarMeta')).toBeDefined();
//     })
//     it('checks description slot rendered', () => {
//       const { getByText } = RenderWithSetup(SuiCard, {}, {}, slots,
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//       expect(getByText('FooBarDescription')).toBeDefined();
//     })
//     it('checks button slot rendered', () => {
//       const { getByText } = RenderWithSetup(SuiCard, {}, {}, slots,
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//       expect(getByText('FooButton')).toBeDefined();
//     })
//     it('checks footer slot rendered', () => {
//       const { getByText } = RenderWithSetup(SuiCard, {}, {}, slots)
//       expect(getByText('BarFooter')).toBeDefined();
//     })
//   })
//   describe('with scoped slots to override appearance', () => {
//     const props = {
//       infoItem: {
//         titleSlot: "FooTitle",
//         metaSlot: "FooBarMeta",
//         descriptionSlot: "BarDescription",
//         footerSlot: 'BarFooter'
//       }
//     };
//     const scopedSlots = {
//       scopedSlots: {
//         title: '<h1>{{ props.infoItem.titleSlot }}</h1>',
//         meta: '<h3>{{ props.infoItem.metaSlot }}</h3>',
//         description: '<p>{{ props.infoItem.descriptionSlot }}</p>',
//         footer: '<p>{{ props.infoItem.footerSlot }}</p>'
//       }
//     }
//     it('checks title slot rendered', () => {
//       const { getByText } = RenderWithSetup(SuiCard, props, {}, scopedSlots, 
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}))
//       expect(getByText('FooTitle')).toBeDefined();
//     })
//     it('checks meta slot rendered', () => {
//       const { getByText } = RenderWithSetup(SuiCard, props, {}, scopedSlots, 
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}))

//       expect(getByText('FooBarMeta')).toBeDefined();
//     })
//     it('checks description slot rendered', () => {
//       const { getByText } = RenderWithSetup(SuiCard, props, {}, scopedSlots, 
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}))

//       expect(getByText('BarDescription')).toBeDefined();
//     })
//     it('checks content slot rendered', () => {
//       props.infoItem.contentSlot = 'FooBarContent';
//       delete props.infoItem.titleSlot; delete props.infoItem.metaSlot; delete props.infoItem.descriptionSlot;

//       scopedSlots.scopedSlots.content = '<p>{{props.infoItem.contentSlot}}</p>'
//       delete scopedSlots.scopedSlots.title; delete scopedSlots.scopedSlots.meta; delete scopedSlots.scopedSlots.description;

//       const { getByText } = RenderWithSetup(SuiCard, props, {}, scopedSlots, 
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}))

//       expect(getByText('FooBarContent')).toBeDefined();
//     })
//     //* Rendering based on slot content acts funky so not functioning 
//     // it('checks footer slot rendered', async () => {
//     //   const { queryByText, updateProps, debug } = RenderWithSetup(SuiCard, props, scopedSlots)
//     //   //await updateProps({infoItem: {contentSlot: 'FooterBar'}});
//     //   expect(queryByText('BarFooter')).toBeTruthy();
//     // })
//   }),
//   describe('with computed properties', () => {
//     describe('to provide fluid design', () => {
//       it('provides a fluid class when fluid & standalone props set', () => {
//         const props = { fluid: true, standalone: true };
//         const { getByText, html } = RenderWithSetup(SuiCard, props, {}, {}, 
//           IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//         expect(html()).toMatch('fluid');
//       });
//       it('provides an auto-width class when fluid & NOT standalone', () => {
//         const props = { fluid: true, standalone: false };
//         const { getByText, html } = RenderWithSetup(SuiCard, props, {}, {}, 
//           IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//         expect(html()).toMatch('auto-width');
//       });
//       it('does not provide any classes when fluid prop not set', () => {
//         const props = { fluid: false, standalone: true };
//         const { getByText, html } = RenderWithSetup(SuiCard, props, {}, {}, 
//           IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//         expect(html()).not.toMatch(/fluid|auto-width/);
//       });
//     })
//     describe('to provide a horizontal design', () => {
//       it('provides a horizontal class only when both horizontal & standalone props set', () => {
//         const props = { horizontal: true, standalone: true }
//         const { getByText, html } = RenderWithSetup(SuiCard, props, {}, {}, 
//           IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//         expect(html()).toMatch('horizontal');
//       });
//       it('does not provide a horizontal class only when only horizontal prop set', () => {
//         const props = { horizontal: true, standalone: false }
//         const { getByText, html } = RenderWithSetup(SuiCard, props, {}, {}, 
//           IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//         expect(html()).not.toMatch('horizontal');
//       });
//       it('provides a horizontal class only when only standalone prop set', () => {
//         const props = { horizontal: false, standalone: true }
//         const { getByText, html } = RenderWithSetup(SuiCard, props, {}, {}, 
//           IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//         expect(html()).not.toMatch('horizontal');
//       });
//     })
//   });
// });