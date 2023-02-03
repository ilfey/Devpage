<script>
import AnilistLogo from "/public/img/logo/AniList.svg";
import DiscordLogo from "/public/img/logo/Discord.svg";
import GithubLogo from "/public/img/logo/Github.svg";
import NotabugLogo from "/public/img/logo/Notabug.svg";
import SpotifyLogo from "/public/img/logo/Spotify.svg";
import VkLogo from "/public/img/logo/VK.svg";
import TelegramLogo from "/public/img/logo/Telegram.svg"
import TwitterLogo from "/public/img/logo/Twitter.svg";
import TwitchLogo from "/public/img/logo/Twitch.svg";
import OsuLogo from "/public/img/logo/osu.svg";
import ShikimoriLogo from "/public/img/logo/Shikimori.svg";
import EmailLogo from "/public/img/logo/Email.svg";
import Navbar from "./components/Navbar.vue";
import Button from "./components/Button.vue";
import UpIcon from "/public/img/Up.svg";

import "@fontsource/inter";

export default {
  components: {
    AnilistLogo,
    DiscordLogo,
    GithubLogo,
    NotabugLogo,
    SpotifyLogo,
    VkLogo,
    TelegramLogo,
    TwitterLogo,
    TwitchLogo,
    OsuLogo,
    ShikimoriLogo,
    EmailLogo,
    Navbar,
    Button,
    UpIcon
  },
  setup: () => {
    // TODO create request to the server

    return {
      genshinProject: {
        title: 'Github',
        logo: GithubLogo,
        url: 'https://github.com/jqweenq/Genshin',
      },
      contacts: [
        {
          title: "Discord",
          logo: DiscordLogo,
          url: "https://t.me/ilfey",
        },
        {
          title: "Telegram",
          logo: TelegramLogo,
          url: "https://t.me/ilfey",
        },
        {
          title: "Вконтакте",
          logo: VkLogo,
          url: "https://vk.com/ilfey",
        },
        {
          title: "Электропочка",
          logo: EmailLogo,
          url: "mailto:ilfey.global@gmail.com",
        },
      ],
      otherContacts: [
        {
          title: "AniList",
          logo: AnilistLogo,
          url: "https://anilist.co/user/JQweenq",
        },
        {
          title: "Shikimori",
          logo: ShikimoriLogo,
          url: "https://shikimori.one/Josty+Qweenq",
        },
        {
          title: "Github",
          logo: GithubLogo,
          url: "https://github.com/ilfey",
        },
        {
          title: "osu!",
          logo: OsuLogo,
          url: "https://osu.ppy.sh/users/16883323",
        },
        {
          title: "Notabug",
          logo: NotabugLogo,
          url: "https://notabug.org/josty",
        },
        {
          title: "Twitter",
          logo: TwitterLogo,
          url: "https://twitter.com/JQweenq",
        },
        {
          title: "Twitch",
          logo: TwitchLogo,
          url: "https://twitch.tv/josty_qweenq",
        },
        {
          title: "Spotify",
          logo: SpotifyLogo,
          url: "https://open.spotify.com/user/zww8xfjo4sxkbu3b9gjzsf0om",
        },
      ],
    }
  },
  methods: {
    backToTop() {
      if (window.pageYOffset > 0) {
        window.scrollBy(0, -100);
        setTimeout(this.backToTop, 0);
      }
    },
  },
  mounted() {
    const goTopBtn = document.getElementById("go-top")
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > document.documentElement.clientHeight) {
        goTopBtn.style.animationName = "showGoTop"
      } else {
        goTopBtn.style.animationName = "hideGoTop"
      }
    })
  },
}
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <section class="part hello-part">
      <h2 class="part__title">Добро пожаловать</h2>
      <p class="part__content">
        Я — сеньер hello world'ов. Являюсь студентом и познаю аспекты веб-разработки, которая мне не особо интересна. В
        свобное время, пополняю хранилище забитых проектов (Github).
        Знаю всего по чуть-чуть, и считаю, что это не есть плохо. Пока я познаю веб-разработку, паралельно изучаю все
        остальное, что может помочь мне в будущем. Например, мобильная разработка.
      </p>
    </section>
    <section class="part part-projects">
      <h2 class="part__title">Мои проекты</h2>
      <img class="img-genshin" src="/img/Genshin.png" alt="Genshin" />
      <p class="part__content">
        Приложение для моего знакомого (не знакомого) сделанное чисто по рофлу.
      </p>
      <p class="part__content">
        Сам сайт <a href="https://genshin-journey.ml" target="_blank">Genshin Journey</a> и приложение написаны, как не
        странно, по тематике Genshin Impact, в приложении
        есть некоторые реализации того, что есть на сайте. На данный момент в приложении есть списки персонажей,
        молитв и словарь.
      </p>
      <p class="part__content">
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
      <Button :attrs="genshinProject" />
    </section>
    <section class="part">
      <h2 class="part__title">Планы на жизнь</h2>
      <ul class="part__list">
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
    <section class="part part-contacts">
      <h2 class="part__title">Мои контакты</h2>
      <div class="buttons-wrapper">
        <Button v-for="contact in contacts" :key="contact.title" :attrs="contact" />
      </div>
    </section>
    <section class="part">
      <h2 class="part__title">Где ещё вы можете меня встретить</h2>
      <div class="buttons-wrapper">
        <Button v-for="contact in otherContacts" :key="contact.title" :attrs="contact" />
      </div>
    </section>
  </main>
  <footer>
    <p>© ilfey 2022-2023</p>
    <a href="https://github.com/ilfey/Devpage">Source code</a>
  </footer>
  <div id="go-top" @click="backToTop()">
    <UpIcon />
    <p>Вверх</p>
  </div>
</template>

<style>
main,
header,
footer {
  width: var(--page-width);
  margin: 0 auto;
}

main {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
}

footer {
  padding: 32px 0;
  font-size: 0.75rem;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
}

h2 {
  margin: 25px 0;
}

.part {
  color: var(--on-background);
  font-size: 1rem;
  width: 100%;
}

.part__title {
  font-family: Inter;
  font-weight: 900;
  font-size: 1.25rem;
}

.part__list {
  margin: 22px;
}

.part__list>li {
  margin: 1rem 0;
}

.part__content {
  text-indent: 1.25rem;
  margin: 22px 0;
}

.img-genshin {
  width: 270px;
  border-radius: 16px;
  margin: 0 25px 25px 0;
}

.buttons-wrapper {
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: var(--button-columns);
}

#go-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
  right: calc((100% - var(--page-width)) / 4 - var(--go-top-width) / 2);
  bottom: 50px;
  border-radius: var(--go-top-radius);
  border: 1px solid var(--primary);
  opacity: 0;
  /* 1 if scrolled */
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  cursor: pointer;
}

#go-top>svg {
  width: 32px;
  height: 32px;
  fill: none;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: var(--primary);
}

#go-top>p {
  font-family: Inter;
  font-weight: 700;
  font-size: 1rem;
  color: var(--primary);
}

#go-top:hover,
#go-top:hover>svg,
#go-top:hover>p {
  color: var(--secondary);
  stroke: var(--secondary);
  border-color: var(--secondary);
}

@keyframes hideGoTop {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes showGoTop {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>