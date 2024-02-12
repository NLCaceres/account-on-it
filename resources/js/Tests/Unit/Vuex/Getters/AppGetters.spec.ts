import { vi } from "vitest";
import { getters } from '@/Store/modules/AppState';
import * as PageVisibilityAPI from "@/Utility/Functions/page_visibility";

describe('Vuex App Module Getters', () => {
  it("checks if on mobile screen", () => {
    const mobileState = { window: { width: 480 } };
    const isMobile = getters.MOBILE_DEVICE_WIDTH(mobileState);
    expect(isMobile).toBe(true);
    //* WHEN the width is > 480, THEN it is NOT a mobile device
    const notMobileState = { window: { width: 481 } };
    const isNotMobile = getters.MOBILE_DEVICE_WIDTH(notMobileState);
    expect(isNotMobile).toBe(false);
  })
  it("checks if on a tablet screen", () => {
    const state = { window: { width: 577 } };
    const result = getters.TABLET_DEVICE_WIDTH(state);
    expect(result).toBe(true);
    //* WHEN the width is <= 576, THEN the device is NOT a tablet
    const tooSmallState = { window: { width: 576 } };
    const tooSmallResult = getters.TABLET_DEVICE_WIDTH(tooSmallState);
    expect(tooSmallResult).toBe(false);
    //* WHEN the width is >= 992, THEN the device is NOT a tablet either
    const tooLargeState = { window: { width: 992 } };
    const tooLargeResult = getters.TABLET_DEVICE_WIDTH(tooLargeState);
    expect(tooLargeResult).toBe(false);
  })
  it("checks if generally on a desktop", () => {
    const desktopState = { window: { width: 992 } };
    const isDesktop = getters.GENERAL_DESKTOP_WIDTH(desktopState);
    expect(isDesktop).toBe(true);
    //* WHEN the width < 992, THEN the device is NOT a desktop
    const notDesktopState = { window: { width: 991 } };
    const isNotDesktop = getters.GENERAL_DESKTOP_WIDTH(notDesktopState);
    expect(isNotDesktop).toBe(false);
  })
  it("checks if on mid-sized desktop screen", () => {
    const state = { window: { width: 992 } };
    const result = getters.MID_DESKTOP_DEVICE_WIDTH(state);
    expect(result).toBe(true);
    //* WHEN the width is < 992, THEN the device is NOT a mid-sized desktop
    const tooSmallState = { window: { width: 991 } };
    const tooSmallResult = getters.MID_DESKTOP_DEVICE_WIDTH(tooSmallState);
    expect(tooSmallResult).toBe(false);
    //* WHEN the width is >= 1400, THEN the device is NOT a mid-sized desktop (It is a desktop still!)
    const tooLargeState = { window: { width: 1400 } };
    const tooLargeResult = getters.MID_DESKTOP_DEVICE_WIDTH(tooLargeState);
    expect(tooLargeResult).toBe(false);
  })
  it("checks if on large desktop screen", () => {
    const state = { window: { width: 1400 } };
    const result = getters.LARGE_DESKTOP_WIDTH(state);
    expect(result).toBe(true);
    //* WHEN the width is < 1400, THEN the device is NOT a large desktop (It is a desktop still!)
    const tooSmallState = { window: { width: 1399 } };
    const tooSmallResult = getters.LARGE_DESKTOP_WIDTH(tooSmallState);
    expect(tooSmallResult).toBe(false);
  })
  describe("checks if page visibility api available", () => { 
    it("should be available", () => {
      const availableState = { websiteVisibility: { hidden: 'hidden', visibilityChange: 'visibilitychange' } };
      const availableResult = getters.PAGE_VISIBILITY_READY(availableState);
      expect(availableResult).toBe(true);
      //* WHEN the page availability sets `hidden` to "none" and `visibilityChange` to "none", THEN the VisibilityAPI is considered unavailable
      const notAvailableState = { websiteVisibility: { hidden: 'none', visibilityChange: 'none' } };
      const notAvailableResult = getters.PAGE_VISIBILITY_READY(notAvailableState);
      expect(notAvailableResult).toBe(false);
    })
    it("calls PageVisAPI Utility Function once with right args", () => {
      const isVisApiAvailableSpy = vi.spyOn(PageVisibilityAPI, "IsVisApiAvailable").mockReturnValue(true);

      const availableState = { websiteVisibility: { hidden: 'hidden', visibilityChange: 'visibilitychange' } };
      getters.PAGE_VISIBILITY_READY(availableState);
      
      expect(isVisApiAvailableSpy).toHaveBeenCalledOnce();
      expect(isVisApiAvailableSpy).toHaveBeenCalledWith(availableState.websiteVisibility.hidden, availableState.websiteVisibility.visibilityChange);
    })
  })
});