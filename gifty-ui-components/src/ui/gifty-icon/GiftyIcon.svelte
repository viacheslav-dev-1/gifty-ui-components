<script>
    import { icon, iconsLoaded } from "./icon-manager";
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';

    // Props
    export let name;

    let loaded = false;
    let iconHtml = null;
    
    onMount(() => {
        loaded = get(iconsLoaded);
        
        if (!loaded) {
            iconsLoaded.subscribe(it => {
                if (it) {
                    loaded = it;
                    getIconHtml();
                }
            });
        } else {
            getIconHtml();
        }
    });

    const getIconHtml = () => {
        iconHtml = icon(name)?.outerHTML;
    }
    
</script>

{#if loaded}
    {#if iconHtml}
        { @html iconHtml }
    {:else}
        { name }
    {/if}
{/if}
