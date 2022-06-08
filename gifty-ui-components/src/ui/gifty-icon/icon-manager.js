import { writable } from 'svelte/store';

/**
 * Load Icons
 * @param { string } url Request Url 
 * @param { * } options Request Options
 * @returns { Promise<{ success: boolean, error: string | undefined }> } Result object
 */
export const loadIcons = async (url, options) => {
    try {
        const response = await fetch(url, options);

        if (response.status !== 200) {
            return { success: false, error: 'Failed to load icons! Status code: ' + response.status };
        }

        const responseText = await response.text();
        iconsXML = new window.DOMParser().parseFromString(responseText, 'text/xml');
        iconsLoaded.update(() => true);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error };
    }
}

/**
 * Gets Icons XML
 * @returns { Document } Icons XML
 */
export const icons = () => {
    return iconsXML;
}

/**
 * Gets Icon by id
 * @param { string } id 
 * @returns { HTMLElement } Icon html element
 */
export const icon = (id) => {
    if (!iconsXML) {
        return null;
    }
    return iconsXML.getElementById(id)
}

let iconsXML = undefined;

export const iconsLoaded = writable(false);
