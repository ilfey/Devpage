import { useCallback, useState } from "react";
import { useMount } from "react-use";
import Footer from "../shared/Footer";
import FloatingButton from "../shared/Buttons/FloatingButton";
import { scrollToElement } from "../utils/utils";
import { Up } from "../Icons";
import { Outlet } from "react-router-dom";


export default function RootPage() {

  const [ScrollBtnIsHidden, setScrollBtnIsHidden] = useState(true);


  useMount(() => {
    const d = document.documentElement;

    window.addEventListener("scroll", () => {
      if (d.clientWidth < 768) {
        if (d.clientWidth < 768 && window.scrollY > d.clientHeight && window.scrollY + d.clientHeight < d.scrollHeight - 100) {
          setScrollBtnIsHidden(false);
          return;
        }

        setScrollBtnIsHidden(true);
        return;
      }

      if (window.scrollY > d.clientHeight) {
        setScrollBtnIsHidden(false);
        return;
      }

      setScrollBtnIsHidden(true);
    });
  });


  const onClickScrollTop = useCallback(() => {
    const el = document.documentElement;
    scrollToElement(el);
  }, [],)

  return (
    <>
      <Outlet />

      <Footer />

      <FloatingButton
        icon={Up}
        onClick={onClickScrollTop}
        className={`fixed right-4 sm:right-6 md:right-6 lg:right-10 xl:right-12 duration-300 ${ScrollBtnIsHidden ? "-bottom-14" : "bottom-4 sm:bottom-6 md:bottom-6 lg:bottom-10 xl:bottom-12"}`}
      />
    </>
  );
}
