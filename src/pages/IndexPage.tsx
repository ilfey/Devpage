import { useState } from "react";

import AuthPopup from "../features/Popups/Auth";
// import Welcome from "../sections/Welcome";
// import Projects from "../sections/Projects";
// import Contacts from "../sections/Contacts";
import Comments from "../widgets/Comments";
import MessageForm from "../widgets/MessageForm";
// import { scrollToElement } from "../utils/utils";
// import Header from "../shared/Header";


export default function Index() {
  const [popupIsShowing, setShowing] = useState(false)

  return (
    <>
      <main>
        <MessageForm
          showAuth={() => setShowing(true) }
        />
        <Comments />
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