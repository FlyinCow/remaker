<script lang="ts" setup>
import * as Monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import { useNoteStore } from '../store';


// enable monaco-editor's webwoker. @ts-ignore dosen't work for no reason
(self as any).MonacoEnvironment = {
  getWorker() {
    return new editorWorker()
  }
}

const editorDom = ref()
const noteStore = useNoteStore()

const models = computed(() => {
  let _m: Record<string, Monaco.editor.ITextModel> = {};
  noteStore.all.map(note => _m[note.title] = Monaco.editor.createModel(note.content, 'markdown'))
  return _m
})

const { currentNote } = storeToRefs(noteStore)

let editorInstance: Monaco.editor.IStandaloneCodeEditor;

onMounted(() => {

  editorInstance = Monaco.editor.create(editorDom.value, {
    language: 'markdown',
    theme: 'hc-dark',
    minimap: {
      enabled: false
    },
    automaticLayout: true
  })

  editorInstance.onDidChangeModelContent(() => {
    if (currentNote.value)
      currentNote.value.content = editorInstance.getValue()
  })

  watch(currentNote, () => {
    editorInstance.setModel(models.value[currentNote.value!.title])
  })
})

onUnmounted(() => {
  editorInstance.dispose()
})

</script>

<template>
  <div class="editor" ref="editorDom"></div>
</template>

<style scoped>
.editor {
  flex-grow: 1;
  min-width: 50%;
  height: 100vh;
}
</style>