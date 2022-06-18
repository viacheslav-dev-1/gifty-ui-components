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
import GiftyToggleButton from "./ui/gifty-button-toggle/GiftyToggleButton.svelte";
import GiftyTextInput from "./ui/gifty-text-input/GiftyTextInput.svelte";


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

<style lang="scss">

</style>


<h2>Components</h2>
<hr> 

<div>
  
  <GiftyButton on:click="{onClick}" icon="case" text="Gifty Button" />
  
  <br/>

  <GiftyCheckbox text="Check Box"/>

  <br/>

  <GiftyRadio text="Radio Button"/>

  <br/>

  <GiftyRadioGroup data = "{[ 
    { id: 1, text: 'Option 1', checked: true },
    { id: 2, text: 'Option 2', checked: false },
    { id: 3, text: 'Option 3', checked: false }
  ]}" aligment='horizontal' />

  <br/>

  <GiftyToggle text="Toggle" />

  <br/>

  <GiftyToggleButton data = "{[
    { id: 1, text: 'Button 1', icon: 'settings', selected: true },
    { id: 2, text: 'Button 2', icon: 'settings', selected: false },
    { id: 3, text: 'Button 3', icon: 'settings', selected: false }
  ]}"/>

  <br/>

  <GiftyTextInput label="Input" width="300px" /><br/>

</div>
