export const THEME_STORAGE_KEY = "bezoskolkov-theme";

export type Theme = "dark" | "light";

export const DEFAULT_THEME: Theme = "dark";

export function isTheme(value: string | null): value is Theme {
  return value === "dark" || value === "light";
}

export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);if(t!=="light"&&t!=="dark")t=${JSON.stringify(DEFAULT_THEME)};document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme",${JSON.stringify(DEFAULT_THEME)});}})();`;
