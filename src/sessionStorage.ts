
const KEY_USERNAME = "username"

function setValue(key: string, value: string) {
  sessionStorage.setItem(key, value)
}

function getValue(key: string): string | null {
  return sessionStorage.getItem(key)
}

export function saveUsername(username: string) {
  setValue(KEY_USERNAME, username)
}

export function loadUsername(): string | null {
  return getValue(KEY_USERNAME)
}
