<script>
    import { createEventDispatcher } from 'svelte';

    /**
     * Radio text
     */
    export let text = null;
    /**
     * Radio state. Could be false, null or undefined - unchecked, true - checked
     */
    export let checked = false;
    /**
     * Determine if radio is disabled
     */
    export let disabled = false;
    /**
     * Radio size
     */
    export let size = 16;
    /**
     * Gifty Radio reference
     */
    export let ref = 'gifty-radio';

    const dispatch = createEventDispatcher();

    const click = () => {
        if (disabled) {
            return;
        }
        checked = !checked;
        dispatch('check', { checked })
    }

    const koef = 6;

    const getContainerStyle = () => {
        const diff = size - koef;
        return `width: ${diff}px; height: ${diff}px`;
    }

</script>

<style lang="scss">
    .container {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        display: flex;
        align-items: center;

        .radio-container {
            padding: 3px;
            border-radius: 1000px;
            border: var(--common-button-foreground) 2px solid;
            display: flex;
            align-items: center;

            &.checked {
                border: var(--main-accent) 2px solid;
                background: var(--main-background)
            }
        }

        .text {
            color: var(--common-button-foreground);
            margin-left: 8px;
            margin-top: 1px;

            &.checked {
                color: var(--main-accent)
            }
        }

        &.disabled {
            opacity: var(--disable-opacity);
            cursor: default;
        }
    }

    :global(.radio-container svg.gifty-radio circle)  {
        fill: var(--main-accent); 
    }
</style>

<div
{ref} 
class="container"
role="radio"
class:disabled
on:click="{click}"
>
    <div class="radio-container" class:checked style="{getContainerStyle()}">
        {#if checked}
            <slot>
                <svg class="gifty-radio" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50"/>
                </svg>
            </slot>
        {/if}
    </div>
    {#if text}
        <div class="text" class:checked style="{'font-size: ' + size + 'px'}">{text}</div> 
    {/if}
</div>
