import { useState } from "react";

import AuthPopup from "../components/Popups/Auth";
import Welcome from "../sections/Welcome";
import Projects from "../sections/Projects";
import Contacts from "../sections/Contacts";
import Comments from "../sections/Comments";
import MessageForm from "../sections/MessageForm";
import Header from "../components/Header";
import { scrollToElement } from "../Utils";
import useActions from "../store/useActions";


function Index() {

  const [popupIsShowing, setShowing] = useState(false)
  const { setReplying } = useActions()

  function scrollToSection(id: string) {
    const el = document.getElementById(id) as HTMLElement
    scrollToElement(el, () => {
      el.classList.add("bg-gray-200", "dark:bg-gray-800")
      setTimeout(() => el.classList.remove("bg-gray-200", "dark:bg-gray-800"), 150)
    })
  }

  return (
    <>
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
          onReply={(msg) => setReplying(msg)}
        />
        <MessageForm
          showAuth={() => { setShowing(true) }}
        />
      </main>

      <AuthPopup
        show={popupIsShowing}
        onClose={() => setShowing(false)}
      />

    </>
  )
}


/* 

// toast

<div className="flex gap-3 items-center max-w-xs p-4 rounded-lg bg-gray-200 dark:bg-gray-800">

<InlineSVG
  className="w-6 h-6 text-red-600 shrink-0"
  src={Error}
/>

<span className="text-base w-full">
  text
</span>

<button className=" rounded-lg p-1.5 text-gray-400 hover:bg-gray-900">
  <InlineSVG
    className="w-4 h-4"
    src={X}
  />
</button>

</div >

*/

export default Index