import "./style/index.less";
import { getVerifyCode } from "./util/handy.mjs";

const pEl = document.querySelector("p");
pEl.textContent = "A random number: " + getVerifyCode();
