/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_BACKEND_URL: string;
    REACT_APP_ADMIN_USERNAME: string;
    REACT_APP_ADMIN_PATH_PREFIX: string;
  }
}