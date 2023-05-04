import { Anilist, Discord, Email, Github, Notabug, Osu, Shikimori, Spotify, Telegram, Twitch, Twitter, Vk } from "../Icons";
import LinkButton from "../components/buttons/LinkButton";
import Section from "../components/Section";
import ActionButton from "../components/buttons/ActionButton";
import ActionLinkButton from "../components/buttons/ActionLinkButton";
import { useCallback, useState } from "react";
import IContact from "../types/contact";

export default function Contacts() {
  const discord = "1lfey#0626"
  const [discordText, setDiscordText] = useState("Username: " + discord)
  const [contacts, setContacts] = useState<Array<IContact>>(bts.contacts)
  const [isAllContacts, setIsAllContacts] = useState(false)

  const onClickDiscord = useCallback(
    () => {
      navigator.clipboard.writeText(discord)
      setDiscordText("Скопировано...")
      setTimeout(() => {
        setDiscordText("Username: " + discord)
      }, 1000)
    },
    [],
  )

  const onClickMany = useCallback(
    () => {
      setIsAllContacts(true)
      setContacts([...contacts, ...bts.otherContacts])
    },
    [contacts],
  )


  return (
    <Section
      id="contacts"
      title="Мои контакты"
    >
      <div className="flex flex-row justify-evenly flex-wrap gap-4">
        <ActionLinkButton
          onClick={onClickDiscord}
          text={discordText}
          logo={Discord}
        />
        {contacts.map(contact =>
          <LinkButton
            url={contact.url}
            title={contact.title}
            key={contact.title}
            logo={contact.logo}
          />
        )}
      </div>

      {!isAllContacts &&
        <ActionButton
          content="Ещё"
          onClick={onClickMany}
          className="mt-10 mx-auto"
        />
      }
    </Section>
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
