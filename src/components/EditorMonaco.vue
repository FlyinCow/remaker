<script lang="ts" setup>
import * as Monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import { useNoteStore } from '../store';


// enable monaco-editor's webwoker. @ts-ignore dosen't work for no reason
(self as any).MonacoEnvironment = {
  getWorker() {
    return new editorWorker()
  }
}

const editor = ref()
const noteStore = useNoteStore()

const models: Record<string, Monaco.editor.ITextModel> = {}
noteStore.all.map(note => models[note.title] = Monaco.editor.createModel(note.content, 'markdwon'))

const { currentNote } = storeToRefs(noteStore)

let editorInstance: Monaco.editor.IStandaloneCodeEditor;

onMounted(() => {

  editorInstance = Monaco.editor.create(editor.value)

  editorInstance.onDidChangeModelContent(() => {
    if (currentNote.value)
      currentNote.value.content = editorInstance.getValue()
  })

  watch(currentNote, () => {
    editorInstance.setModel(models[currentNote.value!.title])
  })
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