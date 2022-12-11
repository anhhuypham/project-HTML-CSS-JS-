import app from "./component/app.js";
("./component/app.js");
import { attach } from "./store.js";

attach(app, document.querySelector("#root"));
