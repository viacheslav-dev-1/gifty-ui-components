<script>
    import { createEventDispatcher } from 'svelte';
import GiftyIcon from '../gifty-icon/GiftyIcon.svelte';

    // Props
    export let showIcon = true;
    export let showText = true;
    export let rounded = false;
    export let withShadow = false;
    export let selectable = false;
    export let selected = false;
    export let disabled = false;
    export let animateOnHover = false;

    // Component ref
    export let ref = 'gifty-button';

    // Private members
    let isSelected = selected;

    // Events
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

    button { 
        display: flex;
        font-size: 16px;
        align-items: center;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        border: transparent 2px solid;
        color: var(--common-button-foreground);
        background: var(--common-button-background);
        user-select: none;

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

            &.animate-on-hover:hover {
                transform: scale(1);
            }
        }

        &.disabled:active {
            background: var(--common-button-background);
        }

        &.animate-on-hover {
            transform: scale(1);
            transition: var(--animation-time);
        }

        &.animate-on-hover:hover {
            transform: scale(var(--scale-size));
            transition: var(--animation-time);
        }
    }

    button:active {
        background: var(--common-button-active-background);
    }

    :global(.gifty-button svg) {
        width: 20px;
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
    class:animate-on-hover="{animateOnHover}" 
    class:selected="{isSelected}"
    class:rounded 
    class:with-shadow="{withShadow}"
    class:disabled
    disabled="{disabled}"
    on:click="{click}"
    >

    {#if showIcon}
        <slot name="icon">
            <GiftyIcon name="default-gifty" />
        </slot>
    {/if}

    {#if showText}
        <span class="text" class:ml="{showIcon}">
            <slot name="text">Gifty Button</slot>
        </span>
    {/if}

</button>
