<script>
    import { createEventDispatcher } from 'svelte';

    /**
     * Checkbox text
     */
    export let text = null;
    /**
     * Checkbox state. Could be false - unchecked, true - checked, null or undefined - indeterminate
     */
    export let checked = false;
    /**
     * Determine if include the indeterminate state in possible states  
     */
    export let includeIndeterminateState = false;
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
        if (!includeIndeterminateState) {
            checked = !checked;
        } else {
            if (checked === null || checked === undefined) {
                checked = true;
            } else {
                checked = !checked;
            }
        }

        dispatch('check', { checked })
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
            background: var(--common-button-background);
            display: flex;
            align-items: center;

            &.checked {
                background: var(--main-accent)
            }
        }

        .text {
            color: var(--common-button-foreground);
            margin-left: 8px;

            &.checked {
                color: var(--main-accent)
            }
        }

        

        &.disabled {
            opacity: var(--disable-opacity);
            cursor: default;
        }
    }

    :global(.checkbox-container svg path)  {
        fill: var(--main-background); 
    }
    

</style>

<div
{ref} 
class="container"
role="checkbox"
class:disabled
on:click="{click}"
>
    <div class="checkbox-container" class:checked style="{'width: ' + size + 'px; height: ' + size + 'px'}">
        {#if checked}
            <slot name="checkbox">
                <svg class="gifty-checkbox" version="1.1" width="{size}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 171 171">
                    <path d="M5.79476,94.04359l13.43205,-13.43419l37.41053,38.47928l95.12944,-96.19819l13.44274,13.44274l-108.57004,107.51625z"></path>
                </svg>
            </slot>
        {/if}
        
    </div>
    {#if text}
        <div class="text" class:checked style="{'font-size: ' + size + 'px'}">{text}</div> 
    {/if}
    
</div>
