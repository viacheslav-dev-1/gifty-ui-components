<script>
    import { createEventDispatcher } from 'svelte';
    import GiftyRadio from '../gifty-radio/GiftyRadio.svelte';

    /**
     * Data for passing to radio group. Shoud be in the following format { id, text, icon, checked, disabled }.
     * "id" should be unique
     */
    export let data;
    /**
     * Determine if radio group is disabled or not
     */
    export let disabled = false;
    /**
     * Aligment of radio buttons in the group. Can be "vertical" or "horizontal"
     */
    export let aligment = 'vertical';
    /**
     * Gap between radio buttons
     */
    export let gap = 12;
    /**
     * Radio group size
     */
    export let size = 16;
    /**
     * Gifty Radio Group reference
     */
    export let ref = 'gifty-radio-group';

     const dispatch = createEventDispatcher();

     const click = (checkedItem) => {
        if (disabled || checkedItem.disabled) {
            return;
        }

        options$.forEach(it => it.checked = checkedItem.id === it.id);
        options$ = options$;
        selectedOption && selectedOption.id === checkedItem.id ||
            dispatch('change', { checkedItem });
        
        selectedOption = checkedItem;
    }

    $: options$ = data ?? [];

    let selectedOption = data?.filter(it => it.checked)[0];

</script>

<style lang="scss">
    .vertical {
        display: flex;
        flex-direction: column;
    }

    .horizontal {
        display: flex;
        flex-wrap: wrap;
    }
</style>

<div
{ref} 
class="gifty-radio-group"
class:vertical="{aligment === 'vertical'}"
class:horizontal="{aligment === 'horizontal'}"
style="{'gap: ' + gap + 'px'}">
    {#each options$ as d}
        <GiftyRadio
            text={d.text}
            radioIcon={d.icon}
            checked={d.checked} 
            disabled={d.disabled || disabled}
            size={size}
            on:check="{() => click(d)}" />
    {/each}
</div>
