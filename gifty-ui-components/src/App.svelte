<script>

import GiftyButton from "./ui/gifty-button/GiftyButton.svelte";
import GiftyIcon from "./ui/gifty-icon/GiftyIcon.svelte";
import { applyTheme } from "./ui/gifty-theme/theme-manager";
import { loadIcons } from "./ui/gifty-icon/icon-manager";
import { onMount } from 'svelte';


onMount(async () => {
  const result = await loadIcons('src/assets/icons.xml');
  console.log(result);
});


let mode = 'light'

const onClick = (event) => {
  mode = mode === 'light' ? 'dark' : 'light';
  applyTheme('blue', mode);
}


</script>

<style>

</style>


<h2>Components</h2>
<hr> 

<div>
  <GiftyButton on:click="{onClick}">
    <GiftyIcon id="settings" slot="icon"/>
    <span slot="text">Custom Text</span>
  </GiftyButton>
  <br/>
  
</div>

