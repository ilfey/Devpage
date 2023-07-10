import { useState } from "react";

import AuthPopup from "../features/Popups/Auth";
import Welcome from "../sections/Welcome";
import Projects from "../sections/Projects";
import Contacts from "../sections/Contacts";
import Comments from "../widgets/Comments";
import MessageForm from "../widgets/MessageForm";
import { scrollToElement } from "../utils/utils";
import Header from "../shared/Header";


export default function Index() {
  const [popupIsShowing, setShowing] = useState(false)

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
        <Comments />
        <MessageForm
          showAuth={() => setShowing(true) }
        />
      </main>

      {popupIsShowing &&
        <AuthPopup
          show={popupIsShowing}
          onClose={() => setShowing(false)}
        />
      }
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