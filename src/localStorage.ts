
const KEY_THEME = "color-scheme"
const KEY_LANGUAGE = "language"


export type Theme = "light" | "dark"
export type Language = "ru" | "en"


export type TThemeHandler = (theme: Theme) => void

const themeHandlers: Array<TThemeHandler> = []


function setValue(key: string, value: string) {
  localStorage.setItem(key, value)
}


function getValue(key: string): string | null {
  return localStorage.getItem(key)
}


export function saveTheme(theme: Theme) {
  setValue(KEY_THEME, theme)

  for (const handler of themeHandlers) {
    handler(theme)
  }
}


export function addThemeHandler(callback: (theme: Theme) => void): number {
  return themeHandlers.push(callback)
}


export function removeThemeHandler(index: number) {
  themeHandlers.splice(index, 1)
}


export function getTheme(): Theme | null {
  return getValue(KEY_THEME) as Theme | null
}


export function saveLanguage(lang: Language) {
  setValue(KEY_LANGUAGE, lang)
}


export function getLanguage(): Language | null {
  return getValue(KEY_LANGUAGE) as Language | null
}

