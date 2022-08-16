<script>
    import { v4 as uuidv4 } from "uuid";
    import { createEventDispatcher, onMount } from "svelte";
    import GiftyIcon from "../gifty-icon/GiftyIcon.svelte";

    /**
     * Type of field. Could be text, password, email, url, phone
     */
    export let type = "text";

    /**
     * Type of styling of field. Could be null, filled, outlined
     */
    export let styling = "";
    /**
     * Text label for input
     */
    export let label = "";
    /**
     * Text content for input
     */
    export let text = "";
    /**
     * Determine if focus is set on input field
     */
    export let focused = false;
    /**
     * Left icon id
     */
    export let leftIcon = "";
    /**
     * Right icon id
     */
    export let rightIcon = "";
    /**
     * Clear button icon
     */
    export let clearIcon = '';
    /**
     * Input field width
     */
    export let width = "";
    /**
     * Determine if text input is disabled
     */
    export let disabled = false;
    /**
     * Determine whether show clear button at the end of the inpu or not
     */
    export let showClearButton = true;
    /**
     * Gifty Input reference
     */
    export let ref = "gifty-text-input";

    let focusedValue = focused;

    let fieldName = uuidv4();

    $: textValue = text;

    onMount(() => {
        focused && !disabled && setFocus();
    });

    const dispatch = createEventDispatcher();

    const change = (e) => {
        textValue = e.target.value;
    };

    const input = (e) => {
        textValue = e.target.value;
    }

    const clearButtonClick = () => {
        if (disabled) {
            return;
        }

        textValue = "";
        dispatch('clear');
    }

    const setFocus = () => {
        if (disabled) {
            return;
        }
        document.getElementsByName(fieldName)[0].focus();
    };

    const getLeftLabelMargin = () => {
        if (leftIcon) {
            return 'margin-left: 25px;';
        }
    }

    const getInputWidth = () => width ? `width: ${width};` : '';

</script>

<style lang="scss">
    .gifty-text-input {
        color: var(--common-button-foreground);
        border-bottom: var(--common-button-foreground) 1px solid;
        display: flex;
        padding: 2px 0;

        .input-label {
            position: absolute;
            cursor: text;
            transition: 0.1s;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            margin-top: -2px;

            &.focused {
                font-size: 11px;
                transform: translateY(-14px);
                transition: 0.1s;
            }

            &.disabled { 
                cursor: default;
            }
        }

        input {
            color: var(--common-button-foreground);
            border: none;
            outline: none;
            background: none;
            width: 100%;
            font-size: 14px;
            padding-left: 0px;

            &.pl {
                padding-left: 5px;
            }
        }

        &.focused {
            border-bottom-color: var(--main-accent);
            color: var(--main-accent);
        }

        &.disabled {
            opacity: var(--disable-opacity);
            cursor: default;
        }
    }

    :global(.gifty-text-input svg) {
        width: 20px;
    }

    :global(.gifty-text-input svg path) {
        fill: var(--common-button-foreground);
    }

    :global(.gifty-text-input.focused svg path) {
        fill: var(--main-accent);
    }

    :global(.gifty-text-input svg.clear-button-icon) {
        width: 14px;
        cursor: pointer;
        border-radius: 100px;
        padding-left: 2px;
    }

    :global(.gifty-text-input svg.clear-button-icon path) {
        fill: var(--common-button-foreground);
    }

</style>

<div 
{ref} 
class="gifty-text-input" 
class:focused={focusedValue}
class:disabled
style="{getInputWidth()}"
>
    <label
        class="input-label"
        class:focused={focusedValue || textValue !== ""}
        class:disabled
        for={fieldName}
        on:click={setFocus}
        style="{getLeftLabelMargin()}"
    >
        {label}
    </label>

    {#if leftIcon}
        <span class="left-icon">
            <GiftyIcon id="{leftIcon}"/>
        </span>
    {/if}
    
    <input
        class:pl="{leftIcon}"
        {type}
        name={fieldName}
        value={textValue}
        {disabled}
        on:focus={() => (focusedValue = true)}
        on:focusout={() => (focusedValue = false)}
        on:change={change}
        on:input={input}
    />

    {#if rightIcon}
        <span class="right-icon">
            <GiftyIcon id="{rightIcon}"/>
        </span>
    {/if}

    {#if showClearButton && textValue}
        {#if !clearIcon}
            <svg class='clear-button-icon' on:click="{clearButtonClick}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 171 171">
                <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                    <path d="M31.31438,21.58875l-9.72562,9.72562l54.18562,54.18563l-54.50625,54.61313l9.61875,9.61875l54.61313,-54.50625l54.50625,54.50625l9.72563,-9.72563l-54.50625,-54.50625l54.18563,-54.18562l-9.72563,-9.72562l-54.18562,54.18562z"></path>
                </g>
            </svg>
        {:else}
            <GiftyIcon className="clear-button-icon" id="{clearIcon}" on:click="{clearButtonClick}" />
        {/if}
    {/if}
</div>
