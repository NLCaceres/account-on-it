import expect from 'expect';
import sinon from 'sinon';
import rewiremock from "rewiremock/webpack";

import { getters } from '../../../../Store/modules/AppState';

describe('Vuex App Module Getters', () => {
  describe("checks if on mobile screen", () => {
    it('should be a mobile screen', () => {
      const state = { window: { width: 480 } };
      const result = getters.MOBILE_DEVICE_WIDTH(state);
      expect(result).toBe(true);
    })
    it('should NOT be a mobile screen', () => {
      const state = { window: { width: 481 } };
      const result = getters.MOBILE_DEVICE_WIDTH(state);
      expect(result).toBe(false);
    })
  })
  describe("checks if on a tablet screen", () => {
    it("should be a tablet screen", () => {
      const state = { window: { width: 577 } };
      const result = getters.TABLET_DEVICE_WIDTH(state);
      expect(result).toBe(true);
    })
    it("should NOT be a tablet screen", () => {
      const tooSmallState = { window: { width: 576 } };
      const tooSmallResult = getters.TABLET_DEVICE_WIDTH(tooSmallState);
      expect(tooSmallResult).toBe(false);
      const tooLargeState = { window: { width: 992 } };
      const tooLargeResult = getters.TABLET_DEVICE_WIDTH(tooLargeState);
      expect(tooLargeResult).toBe(false);
    })
  })
  describe("checks if generally on a desktop", () => {
    it("should be a general desktop screen", () => {
      const state = { window: { width: 992 } };
      const result = getters.GENERAL_DESKTOP_WIDTH(state);
      expect(result).toBe(true);
    })
    it("should NOT be a general desktop screen", () => {
      const state = { window: { width: 991 } };
      const result = getters.GENERAL_DESKTOP_WIDTH(state);
      expect(result).toBe(false);
    })
  })
  describe("checks if on mid-sized desktop screen", () => {
    it("should be a mid-sized desktop screen", () => {
      const state = { window: { width: 992 } };
      const result = getters.MID_DESKTOP_DEVICE_WIDTH(state);
      expect(result).toBe(true);
    })
    it("should NOT be a mid-sized desktop screen", () => {
      const tooSmallState = { window: { width: 991 } };
      const tooSmallResult = getters.MID_DESKTOP_DEVICE_WIDTH(tooSmallState);
      expect(tooSmallResult).toBe(false);
      const tooLargeState = { window: { width: 1400 } };
      const tooLargeResult = getters.MID_DESKTOP_DEVICE_WIDTH(tooLargeState);
      expect(tooLargeResult).toBe(false);
    })
  })
  describe("checks if on large desktop screen", () => {
    it("should be a large desktop screen", () => {
      const state = { window: { width: 1400 } };
      const result = getters.LARGE_DESKTOP_WIDTH(state);
      expect(result).toBe(true);
    })
    it("should NOT be a large desktop screen", () => {
      const tooSmallState = { window: { width: 1399 } };
      const tooSmallResult = getters.LARGE_DESKTOP_WIDTH(tooSmallState);
      expect(tooSmallResult).toBe(false);
    })
  })
  describe("checks if page visibility api available", () => { 
    it("should be available", () => {
      const availableState = { websiteVisibility: { hidden: 'hidden', visibilityChange: 'visibilitychange' } };
      const availableResult = getters.PAGE_VISIBILITY_READY(availableState);
      expect(availableResult).toBe(true);
    })
    it("should NOT be available", () => {
      const notAvailableState = { websiteVisibility: { hidden: 'none', visibilityChange: 'none' } };
      const notAvailableResult = getters.PAGE_VISIBILITY_READY(notAvailableState);
      expect(notAvailableResult).toBe(false);
    })
    it("calls PageVisAPI Utility Function once with right args", () => {
      let isVisApiAvailable = sinon.stub().returns(true);
       
      const appModule = rewiremock.proxy("../../../../Store/modules/AppState", { "../../../../Utility/Functions/page_visibility": { IsVisApiAvailable: isVisApiAvailable } })
      rewiremock.enable();
      const availableState = { websiteVisibility: { hidden: 'hidden', visibilityChange: 'visibilitychange' } };
      
      appModule.getters.PAGE_VISIBILITY_READY(availableState);
      sinon.assert.calledOnceWithExactly(isVisApiAvailable, availableState.websiteVisibility.hidden, availableState.websiteVisibility.visibilityChange);
      rewiremock.disable();
    })
  })
});