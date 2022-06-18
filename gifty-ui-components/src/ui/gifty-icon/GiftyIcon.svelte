<script>
    import { icon, iconsLoaded } from "./icon-manager";
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';

    /**
     * The icon id that should be provided in icon asset file.
     * It can be ignored if icon is loaded by src as an image
     */
    export let id = null;
    /**
     * The icon class name
     */
    export let className = '';
    /**
     * Icon width. If not provided, the width will be provided as in the icon asset file
     */
    export let width = null;
    /**
     * Icon height. If not provided, the height will be provided as in the icon asset file or will be ignored
     */
    export let height = null;
    /**
     * Icon fill color
     */
    export let fill = null;
    /**
     * Icon stroke color
     */
    export let stroke = null;
    /**
     * Icon stroke width
     */
    export let strokeWidth = null;
    /**
    * Icon source. If src is provided, svg icon will be rendered like image instead of direct svg
    */
    export let src = null;

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
        const svg =  icon(id);
        if (svg) {
            width && (svg.style.width = '' + width + 'px');
            height && (svg.style.height = '' + height + 'px');
            fill && (svg.style.fill = fill);
            stroke && (svg.style.stroke = stroke);
            strokeWidth && (svg.style.strokeWidth = strokeWidth);
            className && svg.setAttribute('class', className);
            iconHtml = svg.outerHTML;
        }
    }
    
</script>

{#if !src}
    {#if loaded}
        {#if iconHtml}
            { @html iconHtml }
        {:else}
            { id }
        {/if}
    {/if}
{:else}
    <img {src} {width} {height} alt="icon"/>
{/if}
