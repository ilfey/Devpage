import { TLanguage, TTheme } from "./types/localStorage"


const KEY_THEME = "color-scheme"
const KEY_LANGUAGE = "language"


function setValue(key: string, value: string) {
  localStorage.setItem(key, value)
}


function getValue(key: string): string | null {
  return localStorage.getItem(key)
}


export function saveTheme(theme: TTheme) {
  setValue(KEY_THEME, theme)
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