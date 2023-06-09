import { useState } from "react";

import AuthPopup from "../components/Popups/Auth";
import Welcome from "../sections/Welcome";
import Projects from "../sections/Projects";
import Contacts from "../sections/Contacts";
import Comments from "../sections/Comments";
import MessageForm from "../sections/MessageForm";
import Header from "../components/Header";
import IMessage from "../types/message";
import { scrollToElement } from "../Utils";


function Index() {


  function renderMessages() {
    setMessagesTrigger(Math.random())
  }

  const [popupIsShowing, setShowing] = useState(false)
  const [messagesTrigger, setMessagesTrigger] = useState(Math.random());
  const [repliedMessage, setRepliedMessage] = useState<IMessage | null>(null)

  function scrollToSection(id: string) {
    const el = document.getElementById(id) as HTMLElement
    scrollToElement(el, () => {
      el.classList.add("bg-gray-200", "dark:bg-gray-800")
      setTimeout(() => el.classList.remove("bg-gray-200", "dark:bg-gray-800"), 150)
    })
  }

  return (
    <div>
      <Header items={
        [
          {
            text: "Проекты",
            callback: () => {
              scrollToSection("projects")
            }
          },
          {
            text: "Контакты",
            callback: () => {
              scrollToSection("contacts")
            }
          },
          {
            text: "Комментарии",
            callback: () => {
              scrollToSection("comments")
            }
          },
        ]
      } />

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

      <AuthPopup
        show={popupIsShowing}
        onClose={() => setShowing(false)}
      />
    </div>
  )
}

export default Index