import LinkTextButton from "./buttons/LinkTextButton";


export default function Footer() {
  return (
    <footer className="flex justify-between py-8 text-gray-400 font-nunito border-t-2 border-gray-400">
      <span>© ilfey 2022-2023</span>

      <LinkTextButton className="text-base"
        url="https://github.com/ilfey/Devpage"
        text="Source Code"
      />
    </footer>
  )
}
