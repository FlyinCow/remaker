<script lang="ts" setup>
import * as Monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { useCurrentNote } from '../store';
import { onMounted, onUnmounted, ref } from 'vue';
import { MonacoMarkdownExtension } from 'monaco-markdown'

// enable monaco-editor's webwoker. @ts-ignore dosen't work for no reason
(self as any).MonacoEnvironment = {
  getWorker() {
    return new editorWorker()
  }
}

const editor = ref()
const currentNote = useCurrentNote()

let editorInstance: Monaco.editor.IStandaloneCodeEditor;

onMounted(() => {
  editorInstance = Monaco.editor.create(editor.value, {
    value: currentNote.content,
    language: 'markdown',
    automaticLayout: true,
  })

  editorInstance.onDidChangeModelContent(() => {
    currentNote.content = editorInstance.getValue()
  })

  // TODO: fix compatibility issue
  new MonacoMarkdownExtension().activate(editorInstance as any)

})

onUnmounted(() => {
  editorInstance.dispose()
})

</script>

<template>
  <div class="editor" ref="editor"></div>
</template>

<style scoped>
.editor {
  flex-grow: 1;
  width: 50%;
}
</style>