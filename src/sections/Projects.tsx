import { Github } from "../Icons";
import LinkButton from "../components/buttons/LinkButton";
import Section from "../components/Section";
import { getTheme, addThemeHandler, removeThemeHandler } from "../localStorage";
import { useEffect, useState } from "react";

export default function Projects() {
  const [theme, setTheme] = useState(() =>
    getTheme() // || window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
  )

  useEffect(() => {
    const index = addThemeHandler((theme) => {
      setTheme(theme)
    })

    return () => removeThemeHandler(index)
  }, [])



  return (
    <Section
      id="projects"
      className="h-full"
      title="Мои проекты"
    >
      <div className="relative mx-auto sm:float-left sm:mr-4 mb-4 w-[270px] h-[525px]">
        <img className={`absolute transition-opacity duration-200 ${theme !== "dark" ? "opacity-0" : ""}`} src="/img/genshin-dark.png" alt="Genshin" width="270" height="525" />
        <img className={`absolute transition-opacity duration-200 ${theme !== "light" ? "opacity-0" : ""}`} src="/img/genshin-light.png" alt="Genshin" width="270" height="525" />
      </div>
      <p className="indent-8">
        Приложение для моего знакомого (не знакомого) сделанное чисто по рофлу.
      </p>
      <p className="indent-8 my-2">
        Сам сайт <a className="text-violet-600 font-bold font-nunito" href="https://genshin-journey.ml" target="_blank" rel="noreferrer">Genshin Journey</a> и приложение написаны, как не
        странно, по тематике Genshin Impact, в приложении
        есть некоторые реализации того, что есть на сайте. На данный момент в приложении есть списки персонажей,
        молитв и словарь.
      </p>
      <p className="indent-8">
        Изначально было написано на java, но после несколько раз переписывалось на kotlin.
        Добавлялся свой бэкенд, в котором планировалось создать редактор записей прямо в приложении, но из-за некоторых
        обстоятельств написание было прервано.
        Причиной послужило отсутствие нормального хостинга.
        Спустя более, чем полгода работа возобновилась. Началось очередное переписывание написанного, потому что я узнал
        немного больше аспектов разработки. В определенный момент, я решил попытаться собрать приложение,
        но не смог подписать его. Поэтому я жестка тильтанул и снова забросил.
        Возможно, однажды я возьмусь за проект снова. А пока наслаждайтесь тем, что есть сейчас.
      </p>
      <LinkButton
        className="mx-auto sm:float-right mt-8"
        url="https://github.com/ilfey/Genshin"
        title="Github"
        logo={Github}
      />
    </Section>
  )
}