//import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button.tsx";
import Image from 'next/image';
import GenshinJourneyImg from '../public/img/Genshin.png'
import Head from 'next/head'

const bts = {
  genshinProject: {
    title: "Github",
    logo: "/img/icons/Github.svg",
    url: "https://github.com/jqweenq/Genshin",
  },
  contacts: [
    {
      title: "Discord",
      logo: "/img/icons/Discord.svg",
      url: "https://discord.com/users/696281292408619039",
    },
    {
      title: "Telegram",
      logo: "/img/icons/Telegram.svg",
      url: "https://t.me/ilfey",
    },
    {
      title: "Вконтакте",
      logo: "/img/icons/VK.svg",
      url: "https://vk.com/ilfey",
    },
    {
      title: "Электропочка",
      logo: "/img/icons/Email.svg",
      url: "mailto:ilfey.global@gmail.com",
    },
  ],
  otherContacts: [
    {
      title: "AniList",
      logo: "/img/icons/AniList.svg",
      url: "https://anilist.co/user/JQweenq",
    },
    {
      title: "Shikimori",
      logo: "/img/icons/Shikimori.svg",
      url: "https://shikimori.one/Josty+Qweenq",
    },
    {
      title: "Github",
      logo: "/img/icons/Github.svg",
      url: "https://github.com/ilfey",
    },
    {
      title: "osu!",
      logo: "/img/icons/osu.svg",
      url: "https://osu.ppy.sh/users/16883323",
    },
    {
      title: "Notabug",
      logo: "/img/icons/Notabug.svg",
      url: "https://notabug.org/josty",
    },
    {
      title: "Twitter",
      logo: "/img/icons/Twitter.svg",
      url: "https://twitter.com/JQweenq",
    },
    {
      title: "Twitch",
      logo: "/img/icons/Twitch.svg",
      url: "https://twitch.tv/josty_qweenq",
    },
    {
      title: "Spotify",
      logo: "/img/icons/Spotify.svg",
      url: "https://open.spotify.com/user/zww8xfjo4sxkbu3b9gjzsf0om",
    },
  ],
};


export default function IndexPage() {
  //const router = useRouter()
  //const { locale, locales, defaultLocale } = router

  const [ScrollBtnIsHidden, setScrollBtnIsHidden] = useState(true);
  useEffect(() => {
    const d = document.documentElement;
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
      <Head>
        <title>ilfey</title>
        <meta property="og:title" content="ilfey's devpage"/>
        <meta property="og:url" content="https://ilfey.ru"/>
        <meta property="og:description" content="Страница разработчика - ilfey"/>
        <meta name="description" content="Страница разработчика - ilfey"/>
        <meta property="og:image" content="/favicon-x128.png"/>
      </Head>
      <section className="part hello-part">
        <h2 className="part__title">Добро пожаловать</h2>
        <p className="part__content">
          Я — сеньер hello world'ов. Являюсь студентом и познаю аспекты веб-разработки, которая мне не особо интересна. В
          свобное время, пополняю хранилище забитых проектов (Github).
          Знаю всего по чуть-чуть, и считаю, что это не есть плохо. Пока я познаю веб-разработку, паралельно изучаю все
          остальное, что может помочь мне в будущем. Например, мобильная разработка.
        </p>
      </section>
      <section className="part part-projects">
        <h2 className="part__title">Мои проекты</h2>
        <Image className="img-genshin" src={GenshinJourneyImg} alt="Genshin" width={270} height={525} placeholder="blur" />
        <p className="part__content">
          Приложение для моего знакомого (не знакомого) сделанное чисто по рофлу.
        </p>
        <p className="part__content">
          Сам сайт <a href="https://genshin-journey.ml" target="_blank" rel="noreferrer" >Genshin Journey</a> и приложение написаны, как не
          странно, по тематике Genshin Impact, в приложении
          есть некоторые реализации того, что есть на сайте. На данный момент в приложении есть списки персонажей,
          молитв и словарь.
        </p>
        <p className="part__content">
          Изначально было написано на java, но после несколько раз переписывалось на kotlin.
          Добавлялся свой бэкенд, в котором планировалось создать редактор записей прямо в приложении, но из-за некоторых
          обстоятельств написание было прервано.
          Причиной послужило отсутствие нормального хостинга.
          Спустя более, чем полгода работа возобновилась. Началось очередное переписывание написанного, потому что я узнал
          немного больше аспектов разработки. В определенный
          момент, я решил попытаться собрать приложение, но не смог подписать его. Поэтому я жестка тильтанул и снова
          забросил.
          Возможно, однажды я возьмусь за проект снова. А пока наслаждайтесь тем, что есть сейчас.
        </p>
        <Button url="#" title="Github" logo="/img/icons/Github.svg" />
      </section>
      <section className="part">
        <h2 className="part__title">Планы на жизнь</h2>
        <ul className="part__list">
          <li>
            <p>
              Написать бэкенд для девпеги.
            </p>
          </li>
          <li>
            <p>
              Написать свой VPN, основываясь на WireGuard. Написать клиенты под разные платформы и сервер, с возможностью
              оплаты.
            </p>
          </li>
          <li>
            <p>
              Изучить Docker.
            </p>
          </li>
          <li>
            <p>
              Черешня.
            </p>
          </li>
        </ul>
      </section>
      <section className="part part-contacts">
        <h2 className="part__title">Мои контакты</h2>
        <div className="buttons-wrapper">
          {bts.contacts.map(contact => <Button url={contact.url} title={contact.title} key={contact.title} logo={contact.logo} />)}

        </div>
      </section>
      <section className="part part-other-contacts">
        <h2 className="part__title">Где ещё вы можете меня встретить</h2>
        <div className="buttons-wrapper">
          {bts.otherContacts.map(contact => <Button url={contact.url} title={contact.title} key={contact.title} logo={contact.logo} />)}
        </div>
      </section>
      <div className={ScrollBtnIsHidden ? "fab-top-hidden fab-top" : "fab-top"} id="fab-top" onClick={goToTop}>
        <Image src="/img/icons/Up.svg" alt="Up Icon" width={48} height={48}/>
        <p className="fab-top__text">Вверх</p>
      </div>
    </>
  )
}
