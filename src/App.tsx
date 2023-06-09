import { Up } from "./Icons";

import { useCallback, useEffect, useState } from "react";

import { getLanguage, getTheme } from "./localStorage";

import FloatingButton from "./components/buttons/FloatingButton";
import Index from "./pages/Index";
import Footer from "./components/Footer";
import { scrollToElement } from "./Utils";


export default function App() {


  const [ScrollBtnIsHidden, setScrollBtnIsHidden] = useState(true);


  useEffect(() => {
    const d = document.documentElement;

    if (getTheme() === "dark" || (!getTheme() && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      d.classList.add("dark")
    } else {
      d.classList.remove("dark")
    }

    d.lang = getLanguage() ?? "ru"

    window.addEventListener("scroll", () => {
      if (d.clientWidth < 768) {
        if (d.clientWidth < 768 && window.scrollY > d.clientHeight && window.scrollY + d.clientHeight < d.scrollHeight - 100) {
          setScrollBtnIsHidden(false);
          return
        }

        setScrollBtnIsHidden(true);
        return
      }

      if (window.scrollY > d.clientHeight) {
        setScrollBtnIsHidden(false);
        return
      }

      setScrollBtnIsHidden(true);
    });
  }, [])


  const onClickScrollTop = useCallback(
    () => {
      const el = document.documentElement
      scrollToElement(el)
    },
    [],
  )

  return (
    <>
      <Index />

      <Footer />

      <FloatingButton
        icon={Up}
        onClick={onClickScrollTop}
        className={`fixed right-4 sm:right-6 md:right-6 lg:right-10 xl:right-12 duration-300 ${ScrollBtnIsHidden ? "-bottom-14" : "bottom-4 sm:bottom-6 md:bottom-6 lg:bottom-10 xl:bottom-12"}`}
      />
    </>
  );
}
