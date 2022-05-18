<script>
import GithubLogo from '../static/img/logo/github.svg'
import SpotifyLogo from '../static/img/logo/spotify.svg'
import VkLogo from '../static/img/logo/vk.svg'
import DiscordLogo from '../static/img/logo/discord.svg'
import TwitterLogo from '../static/img/logo/twitter.svg'
import TwitchLogo from '../static/img/logo/twitch.svg'
import OsuLogo from '../static/img/logo/osu.svg'
import ShikimoriLogo from '../static/img/logo/shikimori.svg'
import EmailLogo from '../static/img/logo/email.svg'


export default {
  name: 'IndexPage',
  data: () => ({
	  contacts: [
		{
			title: "Github",
			logo: GithubLogo,
			url: "https://github.com/JQweenq",
		},
		{
			title: "VK",
			logo: VkLogo,
			url: "https://vk.com/JQweenq",
		},
		{
			title: "Shikimori",
			logo: ShikimoriLogo,
			url: "https://shikimori.one/Josty+Qweenq",
		},
		{
			title: "osu!",
			logo: OsuLogo,
			url: "https://osu.ppy.sh/users/16883323",
		},
		{
			title: "Spotify",
			logo: SpotifyLogo,
			url: "https://github.com/JQweenq",
		},
		{
			title: "Twitch",
			logo: TwitchLogo,
			url: "https://github.com/JQweenq",
		},
		{
			title: "Twitter",
			logo: TwitterLogo,
			url: "https://github.com/JQweenq",
		},
		{
			title: "Discord",
			logo: DiscordLogo,
			url: "https://github.com/JQweenq",
		},
		{
			title: "Email",
			logo: EmailLogo,
			url: "mailto:jqweenq@gmail.com",
		},
	]
  })
}
</script>

<template>
	<div class="wrapper"> 
		<Avatar title="Josty Qweenq" url="img/avatar.png" />
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