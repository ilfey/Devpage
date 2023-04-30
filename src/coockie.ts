const KEY_TOKEN = "auth_token"

function setCookie(key: string, value: string) {
  document.cookie = `${key}=${value};`
}

function getCookie(key: string): string | null {
  const cookies = document.cookie.split("; ")

  let value = null

  for (let cookie of cookies) {
    const [k] = cookie.split('=')

    if (k === key) {
      value = cookie
    }
  }

  return value
}

function getCookieValue(key: string): string | null {
  const cookies = document.cookie.split("; ")

  let value = null

  for (let cookie of cookies) {
    const [k, v] = cookie.split('=')

    if (k === key) {
      value = v
    }
  }

  return value
}

export function clearToken() {
  const entry = getCookie(KEY_TOKEN)
  if (entry) {
    const value = entry.split('=')[1]
    document.cookie = `${value}; max-age = 0`
  }
}

export function setToken(token: string) {
  setCookie(KEY_TOKEN, token)
}

export function getToken(): string | null {
  return getCookieValue(KEY_TOKEN)
}
