<script>
  import { afterUpdate } from "svelte";
  export let name = "light";
  export let width = "24px";
  export let height = "24px";
  export let focusable = false;
  let icons = [
    {
      box: 24,
      name: "light",
      svg: `<path fill="currentColor" d="M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"/>`,
    },
    {
      box: 24,
      name: "dark",
      svg: `<path fill="currentColor" d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>`,
    },
  ];
  afterUpdate(() => {
    let displayIcon = icons.find((e) => e.name === name);
    let div = document.querySelectorAll('.darkmode-icon');
    div.forEach(e => {
      e.innerHTML = `<svg focusable="${focusable}" width="${width}" height="${height}" viewBox="0 0 ${displayIcon.box} ${displayIcon.box}">${displayIcon.svg}</svg>`
    })
  });
</script>

<div class="darkmode-icon"></div>
<style>
  .darkmode-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>