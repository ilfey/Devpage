export function scrollToElement(el: HTMLElement, onScrollEnd = () => { }) {
  const { top } = el.getBoundingClientRect()

  let step = 75
  let iterationsCount = Math.abs(Math.floor(top / step))

  if (top < 0) {
    step = -step
    iterationsCount += 1
  }

  function inner(iterations: number) {
    if (iterations !== 0) {
      window.scrollBy(0, step)
      setTimeout(inner, 5, iterations - 1)
    }
  }

  setTimeout(inner, 5, iterationsCount)
  onScrollEnd()
}

export function resizeTextArea(el: HTMLElement) {
  el.style.height = ''
  el.style.height = `${el.scrollHeight}px`
}

export function handleEnterOrEsc(e: React.KeyboardEvent<HTMLTextAreaElement>, onEnter = () => { }, onEsc = () => { }) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    onEnter()
    return
  }

  if (e.key === "Escape") {
    onEsc()
  }
}