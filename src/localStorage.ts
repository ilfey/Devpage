import { TLanguage, TTheme, TThemeHandler } from "./types/localStorage"


const KEY_THEME = "color-scheme"
const KEY_LANGUAGE = "language"

const themeHandlers : Array<TThemeHandler> = []


function setValue(key: string, value: string) {
  localStorage.setItem(key, value)
}


function getValue(key: string): string | null {
  return localStorage.getItem(key)
}


export function saveTheme(theme: TTheme) {
  setValue(KEY_THEME, theme)

  for (let handler of themeHandlers) {
    handler(theme)
  }
}


export function addThemeHandler(callback: (theme: TTheme) => void): number {
  return themeHandlers.push(callback)
}


export function removeThemeHandler(index: number) {
  themeHandlers.splice(index, 1)
}


export function getTheme(): TTheme | null {
  return getValue(KEY_THEME) as TTheme | null
}


export function saveLanguage(lang: TLanguage) {
  setValue(KEY_LANGUAGE, lang)
}


export function getLanguage(): TLanguage | null {
  return getValue(KEY_LANGUAGE) as TLanguage | null
}