<script>
    import { icon, iconsLoaded } from "./icon-manager";

    // Props
    export let name;
    
    let loaded = false;
    let iconHtml = null;
    iconsLoaded.subscribe(it => {
        if (it) {
            loaded = it;
            iconHtml = icon(name)?.outerHTML;
        }
    });
</script>

{#if loaded}
    {#if iconHtml}
        { @html iconHtml }
    {:else}
        { name }
    {/if}
{/if}
