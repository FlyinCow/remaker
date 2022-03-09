<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { watch, watchEffect } from 'vue';
import Editor from './components/Editor.vue';
import Preview from './components/Preview.vue';
import SideBar from './components/SideBar.vue';
import EditorMonaco from './components/EditorMonaco.vue';
import { useCurrentNote } from './store';

const { title } = storeToRefs(useCurrentNote())

// watchEffect(() => {
//   document.title = title.value === '' ? 'untitled' : title.value
// })

</script>

<template>
  <!-- <input v-model="title" placeholder="untitled" /> -->
  <!-- <div class="wrapper"> -->
  <SideBar />
  <div class="main-content">
    <!-- <Editor /> -->
    <EditorMonaco />
    <Preview />
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
