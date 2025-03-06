import "./style/index.less";
import { getVerifyCode } from "./util/handy.mjs";
import loadingSvg from "./assets/loading.svg";

const pEl = document.querySelector("p");
pEl.textContent = "A random number: " + getVerifyCode();
// svg
const svgWrap = document.createElement("div");
svgWrap.innerHTML = loadingSvg;
document.body.appendChild(svgWrap);
svgWrap.querySelector("svg").style.height = "50px";
