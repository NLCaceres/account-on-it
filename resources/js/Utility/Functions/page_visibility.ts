export interface PageVisibilityCSS {
  hidden: string, visibilityChange: string
}

export default function InitPageVisibilityAPI(TabChangeCallback: () => void): PageVisibilityCSS  {   
  const visibility = { hidden: 'none', visibilityChange: 'none'};

  if (typeof document.hidden !== "undefined") { //* General PageVisibility API
    visibility.hidden = "hidden"; 
    visibility.visibilityChange = "visibilitychange";
  } else if (typeof (document as any).mozHidden !== "undefined") { //* Older Firefox polyfill
    visibility.hidden = "mozHidden";
    visibility.visibilityChange = "mozvisibilitychange";
  } else if (typeof (document as any).msHidden !== "undefined") { //* Older Microsoft Edge / IE polyfill
    visibility.hidden = "msHidden";
    visibility.visibilityChange = "msvisibilitychange";
  } else if (typeof (document as any).webkitHidden !== "undefined") { //* Older Chrome / Safari / New Opera polyfill
    visibility.hidden = "webkitHidden";
    visibility.visibilityChange = "webkitvisibilitychange";
  } else {
    console.log("Visibility API not supported");
  }
  //* If we have visibilityAPI then add our listener! 
  if (IsVisApiAvailable(visibility.hidden, visibility.visibilityChange)) { 
    document.addEventListener(visibility.visibilityChange, TabChangeCallback, false); 
  }
  return visibility;
}

export function IsVisApiAvailable(hidden: string, visibilityChange: string) {
  //* Check if any one of the browser or general visApi values
  const apiHiddenValues = ["hidden", "mozHidden", "msHidden", "webkitHidden"];
  const apiVisibilityChangeValues = ["visibilitychange", "mozvisibilitychange", "msvisibilitychange", "webkitvisibilitychange"];
  //* If hidden or visChange's value is one of the values in array, we'll get an index and we know its a correct value
  //? Good workaround if not Javascript's set isn't an option
  if (apiHiddenValues.indexOf(hidden) > -1 && apiVisibilityChangeValues.indexOf(visibilityChange) > -1) {
    return true;
  }
  //* If hidden & visChange are anything else, "none", "undefined", etc, then VisAPI is not ready and do not add EventListener
  return false;
}

export function StopPageVisibilityAPI(visibilityChange: string, TabChangeCallback: () => void) {
  document.removeEventListener(visibilityChange, TabChangeCallback); //* Remove Page Vis Listener
}