  import ripplet from "ripplet.js"; // https://github.com/luncheon/ripplet.js
  
  function rippletOptions1() {
    ripplet.defaultOptions.centered = true;
    let isDarkmode = document.documentElement.getAttribute("theme");

    ripplet.defaultOptions.color = "black";
    if (isDarkmode === "light") ripplet.defaultOptions.color = "white";


    ripplet(arguments[0], { clearing: false });
  }
  function rippletClear() {
    ripplet.clear(this);
  }

  export function RippleEffect(node) {
    node.addEventListener("pointerdown", rippletOptions1);
    node.addEventListener("pointerup", rippletClear);
    node.addEventListener("pointerleave", rippletClear);
  }