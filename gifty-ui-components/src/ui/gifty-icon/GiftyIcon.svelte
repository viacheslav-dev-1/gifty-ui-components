<script>
    import { icon, iconsLoaded } from "./icon-manager";

    // Props
    export let name;

    // Component ref
    export let ref = 'gifty-icon';
    
</script>

{#if $iconsLoaded}
<span 
{ref}>
    {@html icon(name).outerHTML}
</span>
{/if}
