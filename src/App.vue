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
    Button
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
</template>

<style>
header {
  margin: 0 auto;
}

main {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25px 0 100px 0;
}

h2 {
  margin: 0 0 25px 0;
}

.part {
  margin: 0 0 25px 0;
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
}
</style>