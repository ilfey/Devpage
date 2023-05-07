import { Up } from "./Icons";

import { useCallback, useEffect, useState } from "react";


import { scrollToElement } from "./Utils";
import { getLanguage, getTheme } from "./localStorage";
import IMessage from "./types/message";

import AuthPopup from "./components/Popups/Auth";
import Welcome from "./sections/Welcome";
import Projects from "./sections/Projects";
import Contacts from "./sections/Contacts";
import Comments from "./sections/Comments";
import MessageForm from "./sections/MessageForm";
import Header from "./components/Header";
import FloatingButton from "./components/Buttons/FloatingButton";


export default function App() {

  const [popupIsShowing, setShowing] = useState(false)
  const [messagesTrigger, setMessagesTrigger] = useState(Math.random());
  const [ScrollBtnIsHidden, setScrollBtnIsHidden] = useState(true);
  const [repliedMessage, setRepliedMessage] = useState<IMessage | null>(null)

  function renderMessages() {
    setMessagesTrigger(Math.random())
  }

  useEffect(() => {
    const d = document.documentElement;

    if (getTheme() !== "light" || (!getTheme() && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
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
      <Header />
      <main className="flex flex-col">
        <Welcome />
        <Projects />
        <Contacts />
        <Comments
          key={messagesTrigger}
          onReply={(msg) => { setRepliedMessage(msg) }}
        />
        <MessageForm
          replyMessage={repliedMessage}
          onReplyCanceled={() => setRepliedMessage(null)}
          showAuth={() => { setShowing(true) }}
          onPost={() => renderMessages()}
        />
      </main>

      <FloatingButton
        icon={Up}
        onClick={onClickScrollTop}
        className={`fixed right-4 sm:right-6 md:right-6 lg:right-10 xl:right-12 duration-300 ${ScrollBtnIsHidden ? "-bottom-14" : "bottom-4 sm:bottom-6 md:bottom-6 lg:bottom-10 xl:bottom-12"}`}
      />

      <footer className="flex justify-between py-8 text-gray-400 font-nunito">
        <p>© ilfey 2022-2023</p>
        <a className="text-violet-600" href="https://github.com/ilfey/Devpage">Source code</a>
      </footer>
      
      <AuthPopup
        show={popupIsShowing}
        onClose={() => setShowing(false)}
      />
    </>
  );
}
