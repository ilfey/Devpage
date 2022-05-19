<script setup>
import Avatar from "./components/Avatar.vue";
import Contact from "./components/Contact.vue";


const contacts = [
  {
    title: "Github",
    logo: "/img/logo/github.svg",
    url: "https://github.com/JQweenq",
  },
  {
    title: "VK",
    logo: "/img/logo/vk.svg",
    url: "https://vk.com/JQweenq",
  },
  {
    title: "Shikimori",
    logo: "/img/logo/shikimori.svg",
    url: "https://shikimori.one/Josty+Qweenq",
  },
  {
    title: "osu!",
    logo: "/img/logo/osu.svg",
    url: "https://osu.ppy.sh/users/16883323",
  },
  {
    title: "Spotify",
    logo: "/img/logo/spotify.svg",
    url: "https://github.com/JQweenq",
  },
  {
    title: "Twitch",
    logo: "/img/logo/twitch.svg",
    url: "https://github.com/JQweenq",
  },
  {
    title: "Twitter",
    logo: "/img/logo/twitter.svg",
    url: "https://github.com/JQweenq",
  },
  {
    title: "Discord",
    logo: "/img/logo/discord.svg",
    url: "https://github.com/JQweenq",
  },
  {
    title: "Email",
    logo: "/img/logo/email.svg",
    url: "mailto:jqweenq@gmail.com",
  },
];
</script>

<template>
  <Avatar title="Josty Qweenq" url="/img/avatar.png" />
  <div class="contacts-wrapper">
    <Contact
      v-for="contact in contacts"
      :key="contact.title"
      :title="contact.title"
      :logo="contact.logo"
      :url="contact.url"
    />
  </div>
  <h2>My projects</h2>
  <div class="">
	  <p>Genshin Journey APK</p>
	  <span>Мобильное приложение для <a href="https://genshin-journey.ml" target="_blank">сайта</a> написанное под Android на языке программирования Java, но в будующем планируется перейти на Kotlin, в нем используются такие библиотеки как Retrofit, OkHttpClient и LoggingInterceptor для него, сериализатор Gson</span>
  </div>
  <div class="">
	  <p>Genshin Journey Backend</p>
	  <span>Backend для <a href="https://genshin-journey.ml" target="_blank">сайта</a> написанный на языке программирования Python с использованием микрофреймворка Flask и многих дополнений к нему. В данный момент не используется, так как не стабильно и полностью не дописанно, но тестовый релиз можно найти на субдомене <a href="http://api.josty.ml">api.josty.ml</a>, из-за того что хостингом является бесплатный сервис Heroku, спустя некоторое время сервис отключает контейнер и при подключении нового клиета его ожидает 10 секундный тайм-аут</span>
  </div>
</template>

<style>
body {
  background: #070720 url("/img/pattern.png") 0 0/400px 300px repeat;
  min-height: 100%;
}
.wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #a8a8a8;
}
.contacts-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>