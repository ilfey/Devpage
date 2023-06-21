/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BACKEND_URL: string
  readonly VITE_APP_ADMIN_USERNAME: string
  readonly VITE_APP_ADMIN_PATH_PREFIX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
