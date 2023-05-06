import React from 'react'

interface Props {
  id: string,
  title: string,
  className: string
  children: React.ReactNode,
}

export default function Section({ id, title, className, children }: Props) {
  return (
    <section id={id} className="py-8 md:py-[50px] duration-300 rounded-xl">
      <h2 className="mb-6 text-2xl uppercase text-center font-nunito font-bold">{title}</h2>
      <div className={className}>
        {children}
      </div>
    </section>
  )
}

Section.defaultProps = {
  id: "",
  className: "",
}
