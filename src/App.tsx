import { Up } from "./Icons";

import { useCallback, useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import "@fontsource/inter";

import Navbar from './components/Navbar';
import AuthPopup from "./components/Popups/Auth";

import IMessage from "./types/message";
import Welcome from "./sections/Welcome";
import Projects from "./sections/Projects";
import Contacts from "./sections/Contacts";
import Messages from "./sections/Messages";
import MessageForm from "./sections/MessageForm";


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
      if (window.pageYOffset > d.clientHeight) {
        setScrollBtnIsHidden(false);
      } else {
        setScrollBtnIsHidden(true);
      }
    });
  }, [])

  const goToTop = useCallback(
    () => {
      const inner = () => {
        if (!ScrollBtnIsHidden && window.pageYOffset > 0) {
          window.scrollBy(0, -100);
          setTimeout(inner, 3);
        }
      }

      inner()
    },
    [ScrollBtnIsHidden],
  )

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Welcome />
        <Projects />
        <Contacts />
        <Messages
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
      <div className={ScrollBtnIsHidden ? "fab-top-hidden fab-top" : "fab-top"} id="fab-top" onClick={goToTop}>
        <SVG src={Up} />
        <p className="fab-top__text">Вверх</p>
      </div>
      <footer>
        <p>© ilfey 2022-2023</p>
        <a href="https://github.com/ilfey/Devpage">Source code</a>
      </footer>
      <AuthPopup
        show={popupIsShowing}
        onClose={() => setShowing(false)}
      />
    </>
  );
}

export default App;

