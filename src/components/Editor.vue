<script lang="ts" setup>
import { onMounted, ref, toRefs } from 'vue';
import { EditorState } from "@codemirror/state"
import { EditorView, highlightActiveLine, keymap } from "@codemirror/view"
import { defaultKeymap } from "@codemirror/commands"
import { highlightActiveLineGutter, lineNumbers } from "@codemirror/gutter"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { tags, HighlightStyle } from "@codemirror/highlight"
import { languages } from '@codemirror/language-data'
import { oneDark } from '@codemirror/theme-one-dark'
import { basicSetup } from '@codemirror/basic-setup'
import { useCurrentNote } from '../store'

const document = useCurrentNote()
const editor = ref()

const fonttheme = EditorView.theme({
    '.cm-content': {
        fontSize: '1em',
        fontFamily: 'cascadia mono'
    }
})

onMounted(() => {

    const startState = EditorState.create({
        doc: '',
        extensions: [
            basicSetup,
            EditorView.updateListener.of(update => {
                if (update.changes)
                    document.lines = update.state.doc.toJSON()
            }),
            markdown({
                base: markdownLanguage,
                codeLanguages: languages,
                addKeymap: true
            }),
            oneDark,
            fonttheme,
            keymap.of(defaultKeymap),
            lineNumbers(),
            highlightActiveLineGutter(),
            highlightActiveLine(),
            EditorView.lineWrapping
        ]
    })

    const view = new EditorView({
        state: startState,
        parent: editor.value
    })
})

</script>

<template>
    <div class="editor" ref="editor"></div>
</template>

<style scoped>
.editor {
    flex-grow: 1;
}
</style>