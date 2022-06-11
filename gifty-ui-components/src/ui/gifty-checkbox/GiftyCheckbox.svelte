<script>
    import { createEventDispatcher } from 'svelte';

    /**
     * Checkbox state. Could be false - unchecked, true - checked, null or undefined - indeterminate
     */
    export let checked = false;
    /**
     * Determine if checkbox is disabled
     */
    export let disabled = false;
    /**
     * Checkbox size
     */
    export let size = 16;
    /**
     * Gifty Checkbox reference
     */
    export let ref = 'gifty-checkbox';

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

        .checkbox-container {
            padding: 3px;
            border-radius: 3px;
            border: var(--common-button-foreground) 2px solid;
            display: flex;
            align-items: center;

            &.checked {
                border: var(--main-accent) 2px solid;
                background: var(--main-accent)
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

    :global(.checkbox-container svg.gifty-checkbox path)  {
        fill: var(--main-background); 
    }

    :global(.checkbox-container svg.gifty-indetermine path)  {
        fill: var(--common-button-foreground);
    }

</style>

<div
{ref} 
class="container"
role="checkbox"
class:disabled
on:click="{click}"
>
    <div class="checkbox-container" class:checked style="{getContainerStyle()}">
        {#if checked}
            <slot name="checkbox">
                <svg class="gifty-checkbox" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 42.17849 34.673191">
                      <path d="M 0.38919888,21.877249 6.8176639,15.448215 13.848047,22.478598 35.892659,0.38186662 42.567687,6.6080486 13.841864,35.055057 Z" id="path815"/>
                </svg>
            </slot>
        {:else if checked === null || checked === undefined}
            <slot name="indetermine">
                <svg style="margin-top:1px;" class="gifty-indetermine" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 33.932812 7.6457205" >
                    <path d="M 0,0 V 7.6457205 H 33.932812 V 0 Z"/>
                </svg>
            </slot>
        {/if}
        
    </div>
    
    <div class="text" class:checked style="{'font-size: ' + size + 'px'}">
        <slot name="text"></slot>
    </div>
</div>
