const KEY_TOKEN = "auth_token"

function setCookie(key: string, value: string) {
  document.cookie = `${key}=${value};`
}

function getCookie(key: string): string | null {
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

export function setToken(token: string) {
  setCookie(KEY_TOKEN, token)
}

export function getToken(): string | null {
  return getCookie(KEY_TOKEN)
}
