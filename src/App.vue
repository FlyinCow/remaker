<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref, watch, watchEffect } from 'vue';
import Preview from './components/Preview.vue';
import SideBar from './components/SideBar.vue';
import EditorMonaco from './components/EditorMonaco.vue';
import Slide from './components/Slide.vue';
import { useNoteStore } from './store';

const notesStore = useNoteStore()
// watchEffect(() => {
//   document.title = title.value === '' ? 'untitled' : title.value
// })

const raw_notes = [{
  title: 'note1',
  content: "# Note 1",
  tags: ['tag1', 'tag2']
}, {
  title: 'note2',
  content: "# Note 2",
  tags: ['tag2']
}, {
  title: 'note3',
  content: "# Note 3",
  tags: []
}]

raw_notes.map(note => notesStore.notes.set(note.title, {
  title: note.title,
  content: note.content,
  tags: new Set(note.tags)
}))

const current = ref('note1')

</script>

<template>
  <!-- <input v-model="title" placeholder="untitled" /> -->
  <!-- <div class="wrapper"> -->
  <SideBar />
  <div class="main-content">
    <EditorMonaco />
    <Preview />
    <!-- <Slide /> -->
  </div>
  <!-- </div> -->
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
}

.main-content {
  display: flex;
  flex-grow: 1;
}
</style>
