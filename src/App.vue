<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { watch, watchEffect } from 'vue';
import Editor from './components/Editor.vue';
import Preview from './components/Preview.vue';
import SideBar from './components/SideBar.vue';
import { useCurrentNote } from './store';

const { title } = storeToRefs(useCurrentNote())

// watchEffect(() => {
//   document.title = title.value === '' ? 'untitled' : title.value
// })

</script>

<template>
  <!-- <input v-model="title" placeholder="untitled" /> -->
  <div class="wrapper">
    <SideBar />
    <Editor />
    <Preview />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
}

.main-content {
  width: 100%;
}
</style>
