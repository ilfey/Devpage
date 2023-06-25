import { useEffect, useState } from 'react'
import { handleEnterOrEsc, resizeTextArea } from '../../utils/utils'
import TextButton from '../../shared/Buttons/TextButton'

interface IProps {
  content: string
  onEdit: (content: string) => void
  onCancel: () => void
}

export default function MessageEdit({ content, onEdit, onCancel }: IProps) {

  const [editedContent, setEditedContent] = useState(content)

  useEffect(() => {
    const area = document.getElementById("edit-message-form")
    if (area) {
      resizeTextArea(area)
      area.focus()
    }
  }, [editedContent])

  return (
    <>
      <form action="#edit-message" className="w-full">
        <textarea className="w-full p-2 text-sm text-black dark:text-white bg-gray-300 dark:bg-gray-900 resize-none overflow-hidden outline-none rounded-lg"
          id="edit-message-form"
          name="content"
          rows={1}
          onKeyDown={e => handleEnterOrEsc(e, () => onEdit(editedContent), onCancel)}
          onInput={e => resizeTextArea(e.currentTarget)}
          onChange={e => setEditedContent(e.currentTarget.value)}
          value={editedContent}
        />
      </form>

      <div className="flex gap-2 mt-3">
        <TextButton className="text-sm w-fit"
          text="Отмена"
          onClick={onCancel}
        />

        <TextButton className="text-sm w-fit"
          text="Сохранить"
          onClick={() => onEdit(editedContent)}
        />
      </div>
    </>
  )
}
