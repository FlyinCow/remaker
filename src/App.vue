<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import Preview from './components/Preview.vue';
import SideBar from './components/SideBar.vue';
import EditorMonaco from './components/EditorMonaco.vue';
import Slide from './components/Slide.vue';
import { useNoteStore } from './store';

onMounted(() => window.addEventListener(
  'beforeunload',
  () => window.localStorage.setItem('notes', JSON.stringify(useNoteStore().toObject()))
))


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
