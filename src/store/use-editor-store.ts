import { type Editor } from '@tiptap/react'
import { create } from 'zustand'

interface Signature {
  id: string
  src: string
  x: number
  y: number
  width: number
  height: number
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
    set((state) => ({
      signatures: [...state.signatures, { ...sig, id: `sig-${Date.now()}` }]
    })),
  removeSignature: (id) =>
    set((state) => ({
      signatures: state.signatures.filter((sig) => sig.id !== id)
    })),
  updateSignaturePosition: (id, x, y) =>
    set((state) => ({
      signatures: state.signatures.map((sig) => (sig.id === id ? { ...sig, x, y } : sig))
    })),
  updateSignatureSize: (id, width, height) =>
    set((state) => ({
      signatures: state.signatures.map((sig) => (sig.id === id ? { ...sig, width, height } : sig))
    }))
}))
