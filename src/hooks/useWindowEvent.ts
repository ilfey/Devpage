import { useEffect } from "react";

export function useWindowEvent(e: keyof WindowEventMap, fn: () => void) {
    useEffect(() => {
        window.addEventListener(e, fn)
        return () => {
            window.removeEventListener(e, fn)
        }
    }, [])
}