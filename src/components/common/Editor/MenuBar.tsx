import type { Editor } from '@tiptap/react'
import { BarEditorImage } from '../icons'

export const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`menuBar__button ${editor.isActive('bold') && 'bg-black text-white'}`}
      >
        bold
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`menuBar__button ${editor.isActive('italic') && 'bg-black text-white'}`}
      >
        italic
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`menuBar__button ${editor.isActive('strike') && 'bg-black text-white'}`}
      >
        strike
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`menuBar__button ${editor.isActive('code') && 'bg-black text-white'}`}
      >
        code
      </button> */}
      <button
        type='button'
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className='menuBar__button'
      >
        clear marks
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().clearNodes().run()}
        className='menuBar__button'
      >
        clear nodes
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`menuBar__button ${editor.isActive('paragraph') && 'bg-black text-white'}`}
      >
        paragraph
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`menuBar__button ${editor.isActive('heading', { level: 1 }) && 'bg-black text-white'}`}
      >
        h1
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`menuBar__button ${editor.isActive('heading', { level: 2 }) && 'bg-black text-white'}`}
      >
        h2
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`menuBar__button ${editor.isActive('heading', { level: 3 }) && 'bg-black text-white'}`}
      >
        h3
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`menuBar__button ${editor.isActive('heading', { level: 4 }) && 'bg-black text-white'}`}
      >
        h4
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`menuBar__button ${editor.isActive('heading', { level: 5 }) && 'bg-black text-white'}`}
      >
        h5
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`menuBar__button ${editor.isActive('heading', { level: 6 }) && 'bg-black text-white'}`}
      >
        h6
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`menuBar__button ${editor.isActive('bulletList') && 'bg-black text-white'}`}
      >
        bullet list
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`menuBar__button ${editor.isActive('orderedList') && 'bg-black text-white'}`}
      >
        ordered list
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`menuBar__button ${editor.isActive('codeBlock') && 'bg-black text-white'}`}
      >
        code block
      </button> */}
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`menuBar__button ${editor.isActive('blockquote') && 'bg-black text-white'}`}
      >
        blockquote
      </button>
      {/* <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className='menuBar__button'
      >
        horizontal rule
      </button> */}
      <button
        type='button'
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className='menuBar__button'
      >
        hard break
      </button>
      <button
        type='button'
        className='menuBar__button'
        onClick={addImage}
      >
        <BarEditorImage />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().undo().run()}
        className='menuBar__button'
      >
        undo
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().redo().run()}
        className='menuBar__button'
      >
        redo
      </button>
    </>
  )
}
