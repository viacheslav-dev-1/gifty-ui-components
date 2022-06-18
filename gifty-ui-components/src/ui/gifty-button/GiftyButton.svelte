<script>
    import { createEventDispatcher } from 'svelte';
    import GiftyIcon from '../gifty-icon/GiftyIcon.svelte';

    /**
     * Button icon
     */
    export let icon = '';
    /**
     * Button text
     */
    export let text = '';
    /**
     * Determine if button is rounded or not
    */
    export let rounded = false;
    /**
     * Determine if button with shadow or not
    */
    export let withShadow = false;
    /**
     * Determine if button is selectable or not
     */
    export let selectable = false;
    /**
     * Determine if button is selected or not
     */
    export let selected = false;
    /**
     * Determine if button is disabled or not
     */
    export let disabled = false;
    /**
     * Determine if button is without background
     */
    export let withoutBackground = false;
    /**
     * Button size
     */
    export let size = 16;
    /**
     * Gifty Button component ref
     */
    export let ref = 'gifty-button';

    let isSelected = selected;
    
    const dispatch = createEventDispatcher();

	const click = () => {
        if (selectable) {
            isSelected = !isSelected;
            dispatch('select', { selected: isSelected });
        } else {
            dispatch('click');
        }
	}
</script>

<style lang="scss">

    .gifty-button { 
        display: flex;
        align-items: center;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        border: transparent 2px solid;
        color: var(--common-button-foreground);
        background: var(--common-button-background);
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;

        .text {
            margin-top: 1.7px;
        }

        .ml {
            margin-left: 15px;
        }

        &.rounded {
            padding: 15px 15px;
            border-radius: 100px;
        }

        &.with-shadow {
            box-shadow: 0 0 5px var(--main-shadow-color);
        }

        &.selected {
            border: var(--main-accent) 2px solid;
            color: var(--main-accent);
            background: var(--selected-button-background);
        }

        &.selected:active {
            background: var(--selected-button-active-background);
        }

        &.disabled {
            opacity: var(--disable-opacity);
            cursor: default;
        }

        &.disabled:active {
            background: var(--common-button-background);
        }

        &.without-background {
            background: transparent;

            &.selected {
                border: transparent 2px solid;
            }
        }

        &.without-background:active {
            background: transparent;
        }
    }

    .gifty-button:active {
        background: var(--common-button-active-background);
    }

    :global(.gifty-button svg path)  {
        fill: var(--common-button-foreground); 
    }

    :global(.gifty-button.selected svg path)  {
        fill: var(--main-accent);
    }
    
</style>

<button
{ref}
    class="gifty-button"
    class:selected="{isSelected}"
    class:rounded 
    class:with-shadow="{withShadow}"
    class:disabled
    class:without-background="{withoutBackground}"
    disabled="{disabled}"
    on:click="{click}"
    style="font-size: {size}px"
    >

    {#if icon}
        <GiftyIcon width="{(size + 4)}" className="gifty-button-icon" id="{icon}"/>
    {/if}

    {#if text}
        <span class="text" style="{icon && ('margin-left: ' + (size - 4) + 'px')}">
            {text}
        </span>
    {/if}

</button>
