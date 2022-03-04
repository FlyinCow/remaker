<script lang="ts" setup>
import { useTestStore } from '../store';
const store = useTestStore()
</script>

<template>
  <ul>
    <li v-for="data in store.data" :key="store.data.indexOf(data)">{{ data }}</li>
  </ul>
</template>