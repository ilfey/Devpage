import { useCallback, useState } from 'react'
import TextButton from './buttons/TextButton';
import { scrollToElement } from '../Utils';
import InlineSVG from 'react-inlinesvg/esm';
import { Burger, X } from '../Icons';
import { saveLanguage, saveTheme } from '../localStorage';

export default function Header() {
  const htmlClasses = document.documentElement.classList;

  const [lang, setLang] = useState(localStorage.getItem("lang") ?? "ru");
  const toggleLang = useCallback(
    () => {
      const nextlang = lang === "ru" ? "en" : "ru";

      setLang(nextlang);
      saveLanguage(nextlang)
    },
    [lang]
  );

  const [scheme, setScheme] = useState(localStorage.getItem("color-scheme") ?? "dark");
  const toggleScheme = useCallback(
    () => {
      const nextScheme = scheme === "dark" ? "light" : "dark"

      htmlClasses.contains("dark") ? htmlClasses.remove("dark") : htmlClasses.add("dark");

      setScheme(nextScheme);
      saveTheme(nextScheme)
    },
    [htmlClasses, scheme]
  );

  function scrollToSection(id: string) {
    const el = document.getElementById(id) as HTMLElement
    scrollToElement(el, () => {
      el.classList.add("bg-gray-200", "dark:bg-gray-800")
      setTimeout(() => el.classList.remove("bg-gray-200", "dark:bg-gray-800"), 150)
    })
  }

  const [displayBurger, setDisplayBurger] = useState(false)

  function onClickMobileNavItem(id: string) {
    setDisplayBurger(false)
    scrollToSection(id)
  }

  if (document.documentElement.clientWidth < 768) {

    return (
      <header className="flex justify-between text-orange-600 py-6">
        <svg onClick={toggleScheme} className="w-8 h-8" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">

          <path d={
            scheme === "dark" ? "M12 3V4M12 20V21M21 12H20M4 12H3M18.364 18.364L17.657 17.657M6.343 6.343L5.636 5.636M18.364 5.636L17.657 6.343M6.343 17.657L5.636 18.364M16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12Z" : "M15.1946 15.8217C16.9231 16.1748 18.7172 16.0122 20.354 15.354C19.684 17.0213 18.5303 18.45 17.0415 19.4562C15.5528 20.4624 13.7969 21.0001 12 21C9.91038 20.9977 7.88662 20.2687 6.27565 18.9378C4.66468 17.6069 3.56684 15.757 3.17031 13.7054C2.77379 11.6537 3.10329 9.52805 4.10233 7.69272C5.10136 5.85739 6.70771 4.42673 8.646 3.646C7.9878 5.28277 7.82515 7.0769 8.17828 8.80535C8.5314 10.5338 9.38472 12.1204 10.6322 13.3678C11.8796 14.6153 13.4662 15.4686 15.1946 15.8217Z"
          }
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <InlineSVG className="w-8 h-8"
          src={Burger}
          onClick={() => setDisplayBurger(true)}
        />

        <div className={`fixed top-12 right-10 z-10 ${displayBurger ? "translate-x-0 translate-y-0 duration-300" : "translate-x-[150%] translate-y-[-80%] duration-[175ms]"} flex-col `}>

          <InlineSVG className="w-8 h-8 text-white relative -right-24 -top-6"
            src={X}
            onClick={() => setDisplayBurger(false)}
          />

          <nav className="flex flex-col gap-4">
            <TextButton
              text='Проекты'
              className="text-white"
              onClick={() => onClickMobileNavItem("projects")}
            />
            <TextButton
              text='Контакты'
              className="text-white"
              onClick={() => onClickMobileNavItem("contacts")}
            />
            <TextButton
              text='Комментарии'
              className="text-white"
              onClick={() => onClickMobileNavItem("comments")}
            />
          </nav>
        </div>

        <div className={`rounded-full fixed top-0 right-0 w-[520px] h-[460px] ${displayBurger ? "translate-x-[60%] translate-y-[-30%]" : "translate-x-[100%] translate-y-[-80%]"} duration-300 bg-orange-600`}></div>

      </header>
    )
  }

  return (
    <header className="flex justify-between text-orange-600 py-8 text-lg font-nunito font-bold">
      <span onClick={toggleLang} className='cursor-pointer'>{lang === "ru" ? "En" : "Ru"}</span>

      <nav className="flex gap-8">
        <TextButton
          text='Проекты'
          onClick={() => scrollToSection("projects")}
        />
        <TextButton
          text='Контакты'
          onClick={() => scrollToSection("contacts")}
        />
        <TextButton
          text='Комментарии'
          onClick={() => scrollToSection("comments")}
        />
      </nav>

      <svg onClick={toggleScheme} className="w-8 h-8 cursor-pointer" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">

        <path d={
          scheme === "dark" ? "M12 3V4M12 20V21M21 12H20M4 12H3M18.364 18.364L17.657 17.657M6.343 6.343L5.636 5.636M18.364 5.636L17.657 6.343M6.343 17.657L5.636 18.364M16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12Z" : "M15.1946 15.8217C16.9231 16.1748 18.7172 16.0122 20.354 15.354C19.684 17.0213 18.5303 18.45 17.0415 19.4562C15.5528 20.4624 13.7969 21.0001 12 21C9.91038 20.9977 7.88662 20.2687 6.27565 18.9378C4.66468 17.6069 3.56684 15.757 3.17031 13.7054C2.77379 11.6537 3.10329 9.52805 4.10233 7.69272C5.10136 5.85739 6.70771 4.42673 8.646 3.646C7.9878 5.28277 7.82515 7.0769 8.17828 8.80535C8.5314 10.5338 9.38472 12.1204 10.6322 13.3678C11.8796 14.6153 13.4662 15.4686 15.1946 15.8217Z"
        }
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

    </header>
  );
}
