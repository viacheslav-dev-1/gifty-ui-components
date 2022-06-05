// @ts-nocheck
export const applyTheme = (themeObject) => {
    const root = document.querySelector(':root');
    const rootStyles = getComputedStyle(root);
    
    root.style.setProperty('--main-background', '#000')
}

export const themes = [
    {
        name: 'dark',
        params: [
            { name: '--success', value: '#0e865a'}
        ]
    }
];