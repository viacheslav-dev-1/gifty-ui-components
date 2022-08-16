// @ts-nocheck
/**
 * Chooses the Theme by Name and Mode and applies it to the application
 * @param { string } name Theme Name
 * @param { string } mode Theme Mode
 * @returns { { success: boolean, error: string | null } } Result object
 */
export const applyTheme = (name, mode) => {
    const root = document.querySelector(':root');

    if (!name || !mode) {
        return { success: false, error: 'Theme name or mode was not provided!' };
    }

    const themeInd = themes.findIndex(it => it.name === name);

    if (themeInd === -1) {
        return { success: false, error: 'Theme with specified name was not found! If you want to create new Theme, you should use \'addCustomTheme\' function!' };
    }

    const modes = themes[themeInd].modes;
    const modeInd = modes.findIndex(it => it.name === mode);

    if (modeInd === -1) {
        return { success: false, error: 'Mode with specified name was not found! If you want to create new Mode, you should use \'addCustomMode\' function!' };
    }

    modes[modeInd].changedParams.forEach(it => {
        root.style.setProperty(it.name, it.value);
    });

    return { success: true, error: null };
}

/**
 * Adds custom Theme
 * @param { { name: string, modes: Array<{ name: string, changedParams: Array<{ name: string, value: string}> }> } } themeObject Theme Object
 * @returns { { success: boolean, error: string | undefined } } Result object
 */
export const addCustomTheme = (themeObject) => {
    if (themeObject === null || themeObject === undefined) {
        return { success: false, error: 'Theme object cannot be empty!' };
    }

    else if (isBlank(themeObject.name)) {
        return { success: false, error: 'Theme name was not provided!' };
    }

    else if (themes.some(it => it.name === themeObject.name)) {
        return { success: false, error: 'Theme with the specified name already exists!' };
    }

    else if (!(themeObject.name && Array.isArray(themeObject.modes) && themeObject.modes.length > 0)) {
        return { success: false, error: 'Theme modes were not provided!' }
    }

    else {
        themes.push(themeObject);
        return { success: true, error: null };
    }
}

/**
 * Overwrites the existing Theme
 * @param { string } name Theme Name
 * @param { { name: string, modes: Array<{ name: string, changedParams: Array<{ name: string, value: string}> }> } } themeObject Theme Object
 * @returns { { success: boolean, error: string | undefined } } Result object
 */
export const overwriteTheme = (name, themeObject) => {
    let result = removeCustomTheme(name);
    if (!result.success) {
        return result;
    }

    result = addCustomTheme(themeObject);
    return result;
}

/**
 * Removes custom Theme
 * @param { string } name Theme Name
 * @returns { { success: boolean, error: string | undefined } } Result object
 */
export const removeCustomTheme = (name) => {
    if (isBlank(name)) {
        return { success: false, error: 'Theme name was not provided!' };
    }

    if (reservedThemeNames.some(it => it === name)) {
        return { success: false, error: '\'' + name + '\' theme name is reserved!' };
    }

    const index = themes.findIndex(it => it.name === name);

    if (index === -1) {
        return { success: false, error: 'Theme was not found!' };
    }

    themes.splice(index, 1);

    return { success: true, error: null };
}

/**
 * Returns the Theme by it's Name
 * @param {string} name Theme Name
 * @returns { { name: string, modes: Array<{ name: string, changedParams: Array<{ name: string, value: string}> }> } | null } Theme Object
 */
export const getTheme = (name) => {
    if (isBlank(name)) {
        return null;
    }

    return themes.find(it => it.name === name);
}

/**
 * Gets CSS Variable Value
 * @param { string } name CSS Variable Name
 * @returns { string } CSS Variable Value
 */
export const getCSSVariableValue = (name) => {
    const styles = getComputedStyle(document.querySelector(':root'));
    return styles.getPropertyValue(name);
}


// Privates

const isBlank = (str) => (!str || /^\s*$/.test(str));

const reservedThemeNames = ['blue'];

const themes = [
    {
        name: 'blue',
        modes: [
            {
                name: 'light',
                changedParams: [
                    { name: '--main-accent', value: '#455A8F' },
                    { name: '--main-accent-light', value: '#6c8fe7' },
                    { name: '--main-background', value: '#FBFBFB' },
                    { name: '--secondary-background', value: '#EBEBEB' },
                    { name: '--common-button-background', value: '#E0E0E0' },
                    { name: '--common-button-foreground', value: '#525252' },
                    { name: '--common-button-active-background', value: '#c3c3c3' },
                    { name: '--selected-button-background', value: '#f1f4fd' },
                    { name: '--selected-button-active-background', value: '#e1e9ff' }
                ]
            },
            {
                name: 'dark',
                changedParams: [
                    { name: '--main-accent', value: '#a3bdff' },
                    { name: '--main-accent-light', value: '#6782c7' },
                    { name: '--main-background', value: '#414141' },
                    { name: '--secondary-background', value: '#303030' },
                    { name: '--common-button-background', value: '#616161' },
                    { name: '--common-button-foreground', value: '#D4D4D4' },
                    { name: '--common-button-active-background', value: '#7a7a7a' },
                    { name: '--selected-button-background', value: '#46516B' },
                    { name: '--selected-button-active-background', value: '#515e7d' }
                ]
            }
        ]
    }
];
