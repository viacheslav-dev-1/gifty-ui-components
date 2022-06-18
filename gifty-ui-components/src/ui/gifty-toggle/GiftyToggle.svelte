<script>
    import { createEventDispatcher } from 'svelte';
    
    /**
     * Checkbox text
     */
    export let text = "";
    /**
     * Toggle state. Could be false, null or undefined - unchecked, true - checked
     */
    export let checked = false;
    /**
     * Determine if toggle is disabled
     */
    export let disabled = false;
    /**
     * Gifty Toggle reference
     */
    export let ref = 'gifty-toggle';

    const dispatch = createEventDispatcher();

    const click = () => {
        if (disabled) {
            return;
        }
        
        checked = !checked;
        dispatch('check', { checked })
    }

</script>

<style lang="scss">
    .gifty-toggle {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: flex;
        align-items: center;
        cursor: pointer;

        input[type=checkbox] {
            height: 0;
            width: 0;
            visibility: hidden;
            display: flex;
        }

        label {
            width: 40px;
            height: 16px;
            background: var(--common-button-darker-background);
            display: block;
            border-radius: 100px;
            position: relative;
            cursor: pointer;
        }

        label:after {
            content: '';
            position: absolute;
            left: -1px;
            width: 24px;
            height: 24px;
            background: var(--common-button-background);
            border-radius: 1000px;
            transition: 0.2s;
            box-shadow: 0 0 4px var(--main-shadow-color);
            margin-top: -4px;
        }

        input:checked + label {
            background: var(--main-accent-light);
        }

        input:checked + label:after {
            background: var(--main-accent);
            left: calc(100% + 1px);
            transform: translateX(-100%);
        }

        .text {
            color: var(--common-button-foreground);
            margin-left: 8px;
            margin-top: 4px;

            &.checked {
                color: var(--main-accent)
            }
        }

        &.disabled {
            opacity: var(--disable-opacity);
            cursor: default;
        }
    }
</style>

<div
{ref}
class="gifty-toggle" 
class:disabled
role="switch"
on:click="{click}">
    <div>
        <input type="checkbox" id="switch" {checked} disabled />
        <label for="switch"></label>
    </div>
    <div class="text" class:checked>
        {text}
    </div>
</div>
