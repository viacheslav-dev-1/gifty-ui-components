<script>
    import { createEventDispatcher } from 'svelte';

    /**
     * Type of button. Could be: "icon-and-text", "icon", "text"
     */
    export let type = 'icon-and-text'
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
     * Determine if animate button on hover (scale up) or not
     */
    export let animateOnHover = false;
    /**
     * Determine if button is without background
     */
    export let withoutBackground = false;

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
    class:without-background="{withoutBackground}"
    disabled="{disabled}"
    on:click="{click}"
    >

    {#if type === 'icon-and-text' || type === 'icon'}
        <slot name="icon">
            <svg id="default-gifty" viewBox="0 0 27 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.08731 13.9719L0.458282 15.4815L19.0915 32.7488L20.7205 31.2392L2.08731 13.9719Z"/>
                <path d="M18.7901 1.50965L17.1611 3.05176e-05L0.458296 15.4785L2.08733 16.9881L18.7901 1.50965Z"/>
                <path d="M14.5873 14.6342L12.9583 16.1438L25.3463 27.6237L26.9753 26.1141L14.5873 14.6342Z"/>
            </svg>
        </slot>
    {/if}

    {#if type === 'icon-and-text' || type === 'text'}
        <span class="text" class:ml="{type === 'icon-and-text'}">
            <slot name="text">Gifty Button</slot>
        </span>
    {/if}

</button>
