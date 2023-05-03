import { Up } from "./Icons";

import { useCallback, useEffect, useState } from "react";

import AuthPopup from "./components/Popups/Auth";

import IMessage from "./types/message";
import Welcome from "./sections/Welcome";
import Projects from "./sections/Projects";
import Contacts from "./sections/Contacts";
import Comments from "./sections/Comments";
import MessageForm from "./sections/MessageForm";
import Header from "./components/Header";
import FloatingButton from "./components/buttons/FloatingButton";
import { scrollToElement } from "./Utils";


const App = () => {

  const [popupIsShowing, setShowing] = useState(false)
  const [messagesTrigger, setMessagesTrigger] = useState(Math.random());
  const [ScrollBtnIsHidden, setScrollBtnIsHidden] = useState(true);
  const [repliedMessage, setRepliedMessage] = useState<IMessage | null>(null)

  function renderMessages() {
    setMessagesTrigger(Math.random())
  }

  useEffect(() => {
    const d = document.documentElement;

    if (localStorage.getItem("color-scheme") === "light") {
      d.classList.replace("dark", "light");
    }

    if (localStorage.getItem('language') === "en") {
      d.lang = "en";
    }

    window.addEventListener("scroll", () => {
      if (window.scrollY > d.clientHeight) {
        setScrollBtnIsHidden(false);
      } else {
        setScrollBtnIsHidden(true);
      }
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
        className={`fixed right-[50px] duration-300 ${ScrollBtnIsHidden ? "bottom-[-50px]" : "bottom-[50px]"}`}
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

export default App;

