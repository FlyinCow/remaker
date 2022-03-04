<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { watch, watchEffect } from 'vue';
import Editor from './components/Editor.vue';
import Preview from './components/Preview.vue';
import { useCurrentNote } from './store';

const { title } = storeToRefs(useCurrentNote())

watchEffect(() => {
  document.title = title.value === '' ? 'untitled' : title.value
})

</script>

<template>
  <input v-model="title" placeholder="untitled" />
  <div class="flex flex-row justify-evenly items-start">
    <editor class="flex-auto box-border p-4" />
    <preview class="flex-auto box-border p-4" />-->
  </div>
</template>
