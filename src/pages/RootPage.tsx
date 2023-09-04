// import { useState } from "react";
// import Footer from "../shared/Footer";
// import FloatingButton from "../shared/Buttons/FloatingButton";
// import { scrollToElement } from "../utils/utils";
// import { Up } from "../Icons";
import { Outlet } from "react-router-dom";
// import { useWindowEvent } from "../hooks/useWindowEvent";


export default function RootPage() {
  return (
    <>
      <Outlet />
    </>
  );
}
