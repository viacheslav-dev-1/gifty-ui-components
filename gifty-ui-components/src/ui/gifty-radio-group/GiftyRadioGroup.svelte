<script>
    import { createEventDispatcher } from 'svelte';
    import GiftyRadio from '../gifty-radio/GiftyRadio.svelte';

    /**
     * Data for passing to radio group. Shoud be in the following format { id, text, checked, disabled }.
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
        <GiftyRadio text={d.text} checked={d.checked} disabled={d.disabled || disabled} on:check="{() => click(d)}">
            <slot>
                <svg class="gifty-radio" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50"/>
                </svg>
            </slot>
        </GiftyRadio>
    {/each}
</div>
