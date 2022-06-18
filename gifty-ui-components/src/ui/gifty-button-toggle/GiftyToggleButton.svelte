<script>
    import { createEventDispatcher } from "svelte"; 
    import GiftyButton from "../gifty-button/GiftyButton.svelte";

    /**
     * Data for passing to toggle button. Shoud be in the following format { id, text, icon, selected, disabled }.
     * "id" should be unique
     */
    export let data;
    /**
     * Determine whether toggle button supports multiselect or not
     */
    export let multiselect = false;
    /**
     * If devider is greater than 0, the special strip is appeared between buttons
     */
    export let devider = 0;
    /**
     * Determine if all borders of buttons are rounded
     */
    export let buttonsWithRoundedBorders = false;
    /**
     * Determine if toggle button is disabled or not
     */
    export let disabled = false;
    /**
     * Gifty Toggle Button reference
     */
    export let ref = "gifty-toggle-button";

    const dispatch = createEventDispatcher();

    const click = (selectedItem) => {
        if (disabled || selectedItem.disabled) {
            return;
        }

        options$.forEach(it => {
            if (multiselect) {
                it.id === selectedItem.id && (it.selected = !it.selected)
            } else {
                it.selected = selectedItem.id === it.id;
            }
        });
       
        options$ = options$;

        if (multiselect || !(selectedOption && selectedOption.id === selectedItem.id)) {
            dispatch('change', { selectedItem });
        }
        
        multiselect || (selectedOption = selectedItem);
    };

    $: options$ = data ?? [];

    let selectedOption = data?.filter(it => it.selected)[0];

    const getButtonType = (data) => {
        if (data.text && data.icon) {
            return 'icon-and-text';
        }
        else {
            if (!data.text) {
                return 'icon';
            }
            if (!data.icon) {
                return 'text';
            }
        }
    }

</script>

<style lang="scss">
    .gifty-toggle-button {
        display: flex;
        width: fit-content;

        &.not-rounded {

            :global([ref="gifty-toggle-button-gifty-button"]):not(:first-child):not(:last-child) {
                border-radius: 0;
            }

            :global([ref="gifty-toggle-button-gifty-button"]):first-child {
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
            }

            :global([ref="gifty-toggle-button-gifty-button"]):last-child {
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
            }
        }
        
        .devider {
            background: var(--main-background);
        }
    }
</style>

<div 
{ref} 
class="gifty-toggle-button"
class:not-rounded="{!buttonsWithRoundedBorders}">
    {#each options$ as d, i}
        {#key d}
            <GiftyButton
                ref="gifty-toggle-button-gifty-button"
                selected="{d.selected}" 
                disabled="{d.disabled || disabled}"
                text="{d.text}"
                icon="{d.icon}"
                on:click="{() => click(d)}"/>
            {#if i !== options$.length - 1}
                <div class="devider" style="{"width: "+ devider + "px"}"></div>
            {/if}
        {/key}
    {/each}
</div>
