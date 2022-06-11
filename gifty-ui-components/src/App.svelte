<script>

import GiftyButton from "./ui/gifty-button/GiftyButton.svelte";
import GiftyIcon from "./ui/gifty-icon/GiftyIcon.svelte";
import { applyTheme } from "./ui/gifty-theme/theme-manager";
import { loadIcons } from "./ui/gifty-icon/icon-manager";
import { onMount } from 'svelte';
import GiftyCheckbox from "./ui/gifty-checkbox/GiftyCheckbox.svelte";
import GiftyRadio from "./ui/gifty-radio/GiftyRadio.svelte";
import GiftyRadioGroup from "./ui/gifty-radio-group/GiftyRadioGroup.svelte";
import GiftyToggle from "./ui/gifty-toggle/GiftyToggle.svelte";


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

  <GiftyCheckbox>
    <span slot="text">Check Box</span>
  </GiftyCheckbox>

  <br/>

  <GiftyRadio>
    <span slot="text">Radio Button</span>
  </GiftyRadio>

  <br/>

  <GiftyRadioGroup data = "{[ 
    { id: 1, text: 'Option 1', checked: true },
    { id: 2, text: 'Option 2', checked: false }
  ]}" />

  <br/>

  <GiftyToggle>
    <span slot="text">Toggle</span>
  </GiftyToggle>


</div>

