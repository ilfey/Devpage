<script>
import AnilistLogo from "/public/img/logo/AniList.svg";
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

export default {
  components: {
    AnilistLogo,
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
          title: "Telegram",
          logo: TelegramLogo,
          url: "https://t.me/JQweenq",
        },
        {
          title: "Вконтакте",
          logo: VkLogo,
          url: "https://vk.com/jqweenq",
        },
        {
          title: "Электропочка",
          logo: EmailLogo,
          url: "mailto:jqweenq@gmail.com",
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
          url: "https://github.com/JQweenq",
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
      } else if (window.pageYOffset < document.documentElement.clientHeight) {
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
    <div class=" part hello-part">
      <h2 class="part__title">Добро пожаловать</h2>
      <p>
        Я — программист. Основной специальности нету, но иногда занимаюсь
        мобильной разработкой, а иногда веб-разработкой, а бывает такое, что пишу
        скрипты или изучаю для себя новою сферу, по типу администрирования систем
        на базе ядра Linux.
      </p>
    </div>
    <div class="part part-projects">
      <h2 class="part__title">Мои проекты</h2>
      <img class="img-genshin" src="/img/Genshin.png" alt="Genshin" />
      <p>
        Приложение для моего знакомого (не знакомого) сделанное чисто по рофлу.
      </p>
      <p>
        Сам сайт и приложение написаны по тематике Genshin Impact, в приложении
        есть (или будут) реализации того, что есть на сайте. На данный момент в
        приложении есть список персонажей, список молитв и словарь.
      </p>
      <p>
        Написано на Java, есть подгрузка данных с бекэнда и в процессе создания
        отправка данных (планируется редактор записей). В скором времени будет
        переписываться на Kotlin, потому что написание кода происходит быстрее и
        проще, чем на Java.
      </p>
      <Button :attrs="genshinProject" />
    </div>
    <div class="part part-contacts">
      <h2 class="part__title">Мои контакты</h2>
      <div class="buttons-wrapper">
        <Button v-for="contact in contacts" :key="contact.title" :attrs="contact" />
      </div>
    </div>
    <div class="part">
      <h2 class="part__title">Где ещё вы можете меня встретить</h2>
      <div class="buttons-wrapper">
        <Button v-for="contact in otherContacts" :key="contact.title" :attrs="contact" />
      </div>
    </div>
  </main>
  <footer>
    <div id="go-top" @click="backToTop()">
      <UpIcon />
      <p>Вверх</p>
    </div>
  </footer>
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
  min-height: 50px;
}

h2 {
  margin: 25px 0;
}

.part {
  color: var(--on-background);
  font-size: 22px;
  width: 100%;
}

.part__title {
  font-family: Inter-Bold;
  font-size: 32px;
}

.part>p {
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
  font-family: Inter-SemiBold;
  font-size: 22px;
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