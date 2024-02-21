//? Load all App Dependencies Here!

//! CSS
import "../sass/app.scss";

//! Axios set up
import axios from "axios";
axios.defaults.withCredentials = true; //? Useful for cross origin requests
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json"; //* Ensures that Laravel never sends back a new html file

//! Vue Setup
import { createApp, Component } from "vue";
import MyApp from "./Views/App.vue";
const app = createApp(MyApp);

import store from "./Store"; //? Specifying just the dirName grabs any file named `index.js` in it
app.use(store);
import router from "./Routes";
app.use(router)

//! Constants
import CustomEvents from './Utility/Constants/CustomEvents';
import Transitions from './Utility/Constants/Transitions';

//! Plugins
app.use(CustomEvents);
app.use(Transitions);

//? Global Declaration for Vue Components - Usable throughout App, no further importing necessary
const helperComponents = import.meta.glob("./Components/**/*.vue", { import: "default", eager: true });
for (const key in helperComponents) {
  const id = key.split('/').pop()?.split('.')[0];
  if (id) { app.component(id, helperComponents[key] as Component); }
}

app.mount("#app"); //? Attach app instance to index.html's div#app

//! Semantic UI Init
import "fomantic-ui-css/semantic.js"; //? Enables SemanticUI's Javascript to work (it seems to require ".js" suffix due to a typing quirk)
$(".ui.modal").modal(); //? PLUS it helps enable SemanticUI's jQuery extensions like modal() here
