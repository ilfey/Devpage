import { ChangeEvent, useState } from "react"

export function useInput(init: string) {
    const [value, setValue] = useState(init)

    return {
        value,
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setValue(e.target.value)
        }
    }
}