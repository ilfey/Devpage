import LinkTextButton from "./Buttons/LinkTextButton";


export default function Footer() {
  return (
    <>
      <hr className="bg-gray-400"/>
      <footer className="flex justify-between py-8 text-gray-400 font-nunito">
        <span>© ilfey 2022-2023</span>

        <LinkTextButton className="text-base"
          url="https://github.com/ilfey/Devpage"
          text="Source Code"
        />
      </footer>
    </>
    
  )
}
