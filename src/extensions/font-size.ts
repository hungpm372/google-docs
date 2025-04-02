import '@tiptap/extension-text-style'
import { Extension } from '@tiptap/react'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size to a specific value.
       */
      setFontSize: (fontSize: string) => ReturnType
      /**
       * Unset the font size.
       */
      unsetFontSize: () => ReturnType
    }
  }
}

export const FontSizeExtension = Extension.create({
  /**
   * This extension allows you to set the font size of text in the editor.
   */

  /**
   * The name of the extension.
   * This is used to identify the extension in the editor.
   * You can use any string you like, but it's a good idea to use a descriptive name.
   * For example, 'fontSize' is a good name for this extension.
   */
  name: 'fontSize',

  /**
   * The default options for the extension.
   * You can use this to set default values for the options.
   * For example, you can set the default font size to '16px'.
   * This is optional, and you can leave it out if you don't need it.
   * @returns {Object} The default options for the extension.
   */
  addOptions() {
    return {
      types: ['textStyle']
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
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {}
              }

              return {
                style: `font-size: ${attributes.fontSize}`
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
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize }).run()
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run()
        }
    }
  }
})
