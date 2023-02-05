import { useCallback, useState } from "react";


const NavBar = () => {
  const htmlClasses = document.documentElement.classList;

  const [lang, setLang] = useState(localStorage.getItem("lang") ?? "ru");
  const toggleLang = useCallback(
    () => {
      const nextlang = lang === "ru" ? "en" : "ru";

      setLang(nextlang);
      localStorage.setItem("language", nextlang);
    },
    [lang]
  );

  const [scheme, setScheme] = useState(localStorage.getItem("color-scheme") ?? "dark");
  const toggleScheme = useCallback(
    () => {
      const nextScheme = scheme === "dark" ? "light" : "dark"

      htmlClasses.contains("dark") ? htmlClasses.replace("dark", nextScheme) : htmlClasses.replace("light", nextScheme);
      setScheme(nextScheme);

      localStorage.setItem("color-scheme", nextScheme);
    },
    [htmlClasses, scheme]
  );

  return (
    <nav>
      <p onClick={toggleLang}>{lang === "ru" ? "En" : "Ru"}</p>
      <p onClick={toggleScheme}>{scheme === "dark" ? "Light" : "Dark"}</p>
    </nav>
  );
}

export default NavBar;