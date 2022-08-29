<script setup>
import AnilistLogo from "/public/img/logo/AniList.svg"
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

const contacts = [
  {
    title: "Telegram",
    logo: TelegramLogo, // TODO fix this logo viewBox
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
];
const otherContacts = [
  {
    title: "AniList",
    logo: AnilistLogo, // TODO fix this logo viewBox
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
];

function open(link) {
  window.open(link, "_blank");
}
</script>
<template>
  <div class="part hello-part">
    <h2 class="part_title">Добро пожаловать</h2>
    <p>
      Я — программист. Основной специальности нету, но иногда занимаюсь
      мобильной разработкой, а иногда веб-разработкой, а бывает такое, что пишу
      скрипты или изучаю для себя новою сферу, по типу администрирования систем
      на базе ядра Linux.
    </p>
  </div>
  <div class="part part-projects">
    <h2 class="part_title">Мои проекты</h2>
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
    <div class="button" @click="open('https://github.com/jqweenq/Genshin')">
      <div v-html="GithubLogo"></div>
      <p class="button__text">Github</p>
    </div>
  </div>
  <div class="part part-contacts">
    <h2 class="part_title">Мои контакты</h2>
    <div class="buttons-wrapper">
      <div
        class="button"
        v-for="contact in contacts"
        :key="contact.title"
        @click="open(contact.url)"
      >
        <div v-html="contact.logo"></div>
        <p class="button__text">{{ contact.title }}</p>
      </div>
    </div>
  </div>
  <div class="part">
    <h2 class="part_title">Где ещё вы можете меня встретить</h2>
    <div class="buttons-wrapper">
      <div
        class="button"
        v-for="contact in otherContacts"
        :key="contact.title"
        @click="open(contact.url)"
      >
        <div v-html="contact.logo"></div>
        <p class="button__text">{{ contact.title }}</p>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background: #111;
  min-height: 100%;
  font-family: Inter-Regular;
}
h2 {
  margin: 0 0 25px 0;
}
.wrapper {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0 100px 0;
  min-height: 100%;
}
.part {
  margin: 0 0 50px 0;
  color: #fff;
  font-size: 22px;
  width: 100%;
}
.part_title {
  font-family: Inter-Bold;
  font-size: 32px;
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
.button {
  display: flex;
  align-items: center;
  padding: 32px;
  color: #fff;
  border: 1px solid #474747;
  border-radius: 16px;
  transition: 0.1s;
  text-decoration: none;
  font-family: Inter-SemiBold;
  margin: 10px 10px;
}
.button:hover {
  color: #fff;
  border: 1px solid #fff;
}
.button__text {
  height: 100%;
  line-height: 32px;
  flex-basis: 100%;
  margin: 0 0 0 32px;
}
</style>