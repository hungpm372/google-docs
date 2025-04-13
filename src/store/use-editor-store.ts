import { type Editor } from '@tiptap/react'
import { create } from 'zustand'

interface Signature {
  id: string
  src: string
  x: number
  y: number
  width: number
  height: number
  xPercent?: number
  yPercent?: number
}

interface EditorState {
  editor: Editor | null
  signatures: Signature[]
  setEditor: (editor: Editor | null) => void
  addSignature: (sig: Omit<Signature, 'id'>) => void
  removeSignature: (id: string) => void
  updateSignaturePosition: (id: string, x: number, y: number) => void
  updateSignatureSize: (id: string, width: number, height: number) => void
}

export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  signatures: [],
  setEditor: (editor) => set({ editor }),
  addSignature: (sig) =>
    set((state) => {
      const editorElement = document.getElementById('tiptap')
      const editorWidth = editorElement?.offsetWidth || 1
      const editorHeight = editorElement?.offsetHeight || 1

      const xPercent = (sig.x / editorWidth) * 100
      const yPercent = (sig.y / editorHeight) * 100

      return {
        signatures: [
          ...state.signatures,
          {
            ...sig,
            id: `sig-${Date.now()}`,
            xPercent,
            yPercent
          }
        ]
      }
    }),
  removeSignature: (id) =>
    set((state) => ({
      signatures: state.signatures.filter((sig) => sig.id !== id)
    })),
  updateSignaturePosition: (id, x, y) =>
    set((state) => {
      const editorElement = document.getElementById('tiptap')
      const editorWidth = editorElement?.offsetWidth || 1
      const editorHeight = editorElement?.offsetHeight || 1

      const xPercent = (x / editorWidth) * 100
      const yPercent = (y / editorHeight) * 100

      return {
        signatures: state.signatures.map((sig) =>
          sig.id === id ? { ...sig, x, y, xPercent, yPercent } : sig
        )
      }
    }),
  updateSignatureSize: (id, width, height) =>
    set((state) => ({
      signatures: state.signatures.map((sig) => (sig.id === id ? { ...sig, width, height } : sig))
    }))
}))
