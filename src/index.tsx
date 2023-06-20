import { createRoot } from "react-dom/client";
import "./index.css";
import "./fonts/fonts.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./pages/routes";
import { useMount } from "react-use";
import { getLanguage, getTheme } from "./localStorage";


const router = createBrowserRouter(routes);

function Root() {
  useMount(() => {
    const d = document.documentElement;

    // set theme
    if (getTheme() === "dark" || (!getTheme() && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      d.classList.add("dark")
    } else {
      d.classList.remove("dark")
    }

    // set language
    d.lang = getLanguage() ?? "ru";
  })

 return (
   <Provider store={store}>
     <RouterProvider router={router} />
   </Provider>
 )
}

createRoot(
  document.getElementById("root") as HTMLElement
).render(<Root/>);
