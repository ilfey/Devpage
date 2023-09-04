import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { useEffect } from "react";
// import { getLanguage, getTheme } from "../localStorage";
import { store } from "../store/store";
import { routes } from "../pages/routes";


const router = createBrowserRouter(routes);

export default function App() {
  /*
  useEffect(() => {
    const d = document.documentElement;

    // set theme
    if (getTheme() === "dark" || (!getTheme() && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      d.classList.add("dark")
    } else {
      d.classList.remove("dark")
    }

    // set language
    d.lang = getLanguage() ?? "ru";
  }, [])
  */

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}


