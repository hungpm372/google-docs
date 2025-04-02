import '@tiptap/extension-text-style'
import { Extension } from '@tiptap/react'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineHeight: {
      /**
       * Set the line height of the text.
       * This will set the line height of the text to the specified value.
       * @param {string} lineHeight - The line height to set.
       * This can be any valid CSS line height value, such as '1.5', '2', 'normal', etc.
       */
      setLineHeight: (lineHeight: string) => ReturnType
      /**
       * Unset the line height of the text.
       * This will remove the line height from the text.
       * This is useful if you want to remove the line height from the text.
       */
      unsetLineHeight: () => ReturnType
    }
  }
}

export const LineHeightExtension = Extension.create({
  /**
   * This extension allows you to set the line height of the text in the editor.
   * You can use this extension to set the line height of the text to any value you like.
   */

  /**
   * The name of the extension.
   * This is used to identify the extension in the editor.
   * You can use any string you like, but it's a good idea to use a descriptive name.
   * For example, 'lineHeight' is a good name for this extension.
   */
  name: 'lineHeight',

  /**
   * The default options for the extension.
   * You can use this to set default values for the options.
   * For example, you can set the default line height to 'normal'.
   * This is optional, and you can leave it out if you don't need it.
   * @returns {Object} The default options for the extension.
   */
  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      defaultLineHeight: 'normal'
    }
  },

  /**
   * This method is used to add global attributes to the editor.
   * Global attributes are attributes that can be applied to any node in the editor.
   * For example, you can add a global attribute for font size.
   * This is optional, and you can leave it out if you don't need it.
   * @returns {Array} An array of global attributes to be added to the editor.
   */
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            parseHTML: (element) => element.style.lineHeight || this.options.defaultLineHeight,
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {}
              }

              return {
                style: `line-height: ${attributes.lineHeight}`
              }
            }
          }
        }
      }
    ]
  },

  /**
   * This method is used to add commands to the editor.
   * Commands are functions that can be called to perform actions in the editor.
   * For example, you can add a command to set the font size.
   * This is optional, and you can leave it out if you don't need it.
   * @returns {Object} An object containing the commands to be added to the editor.
   */
  addCommands() {
    return {
      setLineHeight:
        (lineHeight) =>
        ({ tr, state, dispatch }) => {
          const { selection } = state
          tr = tr.setSelection(selection)

          const { from, to } = selection
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              tr = tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHeight
              })
            }
          })

          if (dispatch) {
            dispatch(tr)
          }
          return true
        },
      unsetLineHeight:
        () =>
        ({ tr, state, dispatch }) => {
          const { selection } = state
          tr = tr.setSelection(selection)

          const { from, to } = selection
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              tr = tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHeight: this.options.defaultLineHeight
              })
            }
          })

          if (dispatch) {
            dispatch(tr)
          }
          return true
        }
    }
  }
})
