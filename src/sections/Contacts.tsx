import { Anilist, Discord, Email, Github, Notabug, Osu, Shikimori, Spotify, Telegram, Twitch, Twitter, Vk } from "../Icons";
import Button from "../components/Button";

export default function Contacts() {
  return (
    <section className="part part-contacts">
      <h2 className="part__title">Мои контакты</h2>
      <div className="buttons-wrapper">
        {bts.contacts.map(contact =>
          <Button
            url={contact.url}
            title={contact.title}
            key={contact.title}
            logo={contact.logo}
          />
        )}
      </div>
    </section>
  )
}

const bts = {
  genshinProject: {
    title: 'Github',
    logo: Github,
    url: 'https://github.com/jqweenq/Genshin',
  },
  contacts: [
    {
      title: "Discord",
      logo: Discord,
      url: "https://discord.com/users/696281292408619039",
    },
    {
      title: "Telegram",
      logo: Telegram,
      url: "https://t.me/ilfey",
    },
    {
      title: "Вконтакте",
      logo: Vk,
      url: "https://vk.com/ilfey",
    },
    {
      title: "Электропочка",
      logo: Email,
      url: "mailto:ilfey.global@gmail.com",
    },
  ],
  otherContacts: [
    {
      title: "AniList",
      logo: Anilist,
      url: "https://anilist.co/user/JQweenq",
    },
    {
      title: "Shikimori",
      logo: Shikimori,
      url: "https://shikimori.one/Josty+Qweenq",
    },
    {
      title: "Github",
      logo: Github,
      url: "https://github.com/ilfey",
    },
    {
      title: "osu!",
      logo: Osu,
      url: "https://osu.ppy.sh/users/16883323",
    },
    {
      title: "Notabug",
      logo: Notabug,
      url: "https://notabug.org/josty",
    },
    {
      title: "Twitter",
      logo: Twitter,
      url: "https://twitter.com/JQweenq",
    },
    {
      title: "Twitch",
      logo: Twitch,
      url: "https://twitch.tv/josty_qweenq",
    },
    {
      title: "Spotify",
      logo: Spotify,
      url: "https://open.spotify.com/user/zww8xfjo4sxkbu3b9gjzsf0om",
    },
  ],
};
