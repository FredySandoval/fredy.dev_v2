<script>
  import Icon from "./Icon.svelte";
  import { RippleEffect } from "./utils";
  import { onMount } from "svelte";
  import Image from './image.gif';
  let bool = "light";
  onMount(() => {
    bool = localStorage.getItem("theme");
    if (!bool && window.matchMedia("(prefers-color-scheme: dark)").matches)
      bool = "dark";
    if (!bool) bool = "light";
  });

  function setTheme(newTheme) {
    const but = document.querySelector('.darkbutton');
    but.classList.add("bg-transition"); // adds a smooth transition, if we add it to body element it creates a flash
    // document.body.classList.add("bg-transition"); // adds a smooth transition, if we add it to body element it creates a flash
    document.documentElement.setAttribute("theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }
  function handleClick() {
     bool = bool == "light" ? "dark" : "light";
    let theme = document.documentElement.getAttribute("theme") || "light";
    if (theme === "light") {
      setTheme("dark");
      return;
    }
    setTheme("light");
  }
</script>

<svelte:head>
  <script>
    // This code prevents the “flash of incorrect theme” (FOIT).
    let themeOverride = localStorage.getItem("theme");

    if (
      !themeOverride &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      themeOverride = "dark";
    if (!themeOverride) themeOverride = "light";

    document.documentElement.setAttribute("theme", themeOverride);
  </script>
</svelte:head>
<img src="{Image}" alt="example" width="500" class="mainimage">
<br>
<br>
<button on:click={handleClick} use:RippleEffect class="bt-container hoverEffect">
  <Icon name={bool}/>
</button>

<style>
  .bt-container:hover {
    cursor: pointer;
  }
  .bt-container {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 0px;
    border: 1px solid gray;
    background-color: transparent;
    color: var(--color);
  }
</style>