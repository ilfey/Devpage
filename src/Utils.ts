export function scrollToElement(el: HTMLElement, onScrollEnd = () => { }) {
  const { top } = el.getBoundingClientRect()
  const step = top < 0 ? -75 : 75

  const elY = window.scrollY + top

  if (elY > window.scrollY && elY < window.scrollY + window.innerHeight) {
    onScrollEnd()
    return
  }

  function inner() {
    if (step < 0) {
      if (elY < window.scrollY) {
        window.scrollBy(0, step);
        setTimeout(inner, 5);
      } else {
        onScrollEnd()
      }
    } else {
      if (elY > window.scrollY) {
        window.scrollBy(0, step);
        setTimeout(inner, 5);
      } else {
        onScrollEnd()
      }
    }
  }

  inner()
}