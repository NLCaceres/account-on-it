// import { render, fireEvent } from '@testing-library/vue'
// import RenderWithSetup from '../../../render';
// import expect from 'expect';
// import SuiCardSet from '../../../../Components/Elements/Cards/SuiCardSet.vue';
// import LAZY_LOAD_OBSERVER from '../../../../Store/modules/IntersectionState';

// const IntersectionObserverVuexState = (observerList) => {
//   return { modules: { intersectionAPI: { state: { observers: { ...observerList }}}}};
// }

// describe('Semantic UI Card Set Component', () => {

//   describe('with basic cards with basic info items', () => {

//     const props = {
//       cardSet: []
//     }
//     const InfoItem = (index = 0) => { 
//       return {
//         title: "FooTitle" + index,
//         meta: "FooBarMeta" + index,
//         description: "BarDescription" + index,
//         img: {
//           src: 'FooImgSource',
//           alt: 'BarAltText'
//         }
//       }
//     }
//     props.cardSet.push(InfoItem(), InfoItem(1), InfoItem(2))

//     it('checks all items rendered', () => {
//       const { getByText } = RenderWithSetup(SuiCardSet, props, {}, {}, 
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//       const foundNodes = []
//       for (const [index, card] of props.cardSet.entries()) foundNodes.push(getByText(InfoItem(index).description)); 
//       expect(foundNodes).toHaveLength(3);
//     })
//     it('rerenders new items', async () => {
//       const { getByText, updateProps } = RenderWithSetup(SuiCardSet, props, {}, {}, 
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//       const foundNodes = [];
//       for (const [index, card] of props.cardSet.entries()) foundNodes.push(getByText(InfoItem(index).description)); 
//       expect(foundNodes).toHaveLength(3);
//       await updateProps({cardSet: [...props.cardSet, InfoItem(3)]});
//       foundNodes.push(getByText(InfoItem(3).description));
//       expect(foundNodes).toHaveLength(4);
//     })
  
//   })
//   describe('with scoped slots to override appearance', () => {
//     const props = {
//       cardSet: []
//     }
//     const InfoItem = (index = 0) => {
//       return { 
//         titleSlot: "FooTitle" + index,
//         metaSlot: "FooBarMeta" + index,
//         descriptionSlot: "BarDescription" + index,
//         footerSlot: 'BarFooter' 
//       }
//     }
//     props.cardSet = [InfoItem(), InfoItem(1), InfoItem(2)]
//     const scopedSlots = {
//       scopedSlots: {
//         title: '<h1>{{ props.infoItem.titleSlot }}</h1>',
//         meta: '<h3>{{ props.infoItem.metaSlot }}</h3>',
//         description: '<p>{{ props.infoItem.descriptionSlot }}</p>',
//         footer: '<p>{{ props.infoItem.footerSlot }}</p>'
//       }
//     }
//     it('checks meta slot rendered', () => {
//       const { getByText } = RenderWithSetup(SuiCardSet, props, {}, scopedSlots, 
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//       const foundNodes = [];
//       for (const [index, card] of props.cardSet.entries()) foundNodes.push(getByText(InfoItem(index).metaSlot)); 
//       expect(foundNodes).toHaveLength(3);
//     })
//     it('checks description slot rendered', () => {
//       const { getByText } = RenderWithSetup(SuiCardSet, props, {}, scopedSlots, 
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//       const foundNodes = [];
//       for (const [index, card] of props.cardSet.entries()) foundNodes.push(getByText(InfoItem(index).descriptionSlot)); 
//       expect(foundNodes).toHaveLength(3);
//     })
//     it('checks content slot rendered', () => {   
//       scopedSlots.scopedSlots.content = '<p>{{props.infoItem.descriptionSlot}}</p>'
//       delete scopedSlots.scopedSlots.title; delete scopedSlots.scopedSlots.meta; delete scopedSlots.scopedSlots.description;
//       const { getByText } = RenderWithSetup(SuiCardSet, props, {}, scopedSlots, 
//         IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//       const foundNodes = [];
//       for (const [index, card] of props.cardSet.entries()) foundNodes.push(getByText(InfoItem(index).descriptionSlot)); 
//       expect(foundNodes).toHaveLength(3);
//     })
//   })
//   describe('with computed properties and 1 method to change design', () => {
//     describe('with props to center cards it renders', () => {
      
//     });
//     describe('with a horizontal prop that styles card set and child cards', () => {
//       it('provides the horizontal class to set of cards', () => {
//         const props = { horizontal: true };
//         const { html } = RenderWithSetup(SuiCardSet, props, {}, {}, 
//           IntersectionObserverVuexState({[LAZY_LOAD_OBSERVER]: new IntersectionObserver(()=>{})}));
//         expect(html()).toMatch('horizontal');
//       });
//     })
//   });
// });