import type { Plugin, Transformer } from 'unified'
import { visit } from 'unist-util-visit'
import type { Text, Root } from 'mdast'
import type { Literal } from 'unist'

import { useNoteStore } from './store'

interface TagOption {

}


const noteTag: Plugin<[], Root> = function (options: TagOption = {}) {
  const noteStore = useNoteStore()
  const re = /^(#([-\/\w]{1,}))$/
  let result: RegExpExecArray | null;
  return (input) => {
    visit(input, 'text', (node) => {
      if (result = re.exec(node.value)) {

      }
    })
  }
}


export default noteTag