<script lang="ts" setup>
import NoteTree from './NoteTree.vue'


</script>

<template>
    <div class="sidebar">
        <NoteTree />
    </div>
</template>

<style scoped>
.sidebar {
    height: 100vh;
    background-color: #323537;
    flex-basis: 240px;
    flex-grow: 0;
    position: relative;
}

.menubar {
    width: 100%;
    background-color: #464b50;
}

.menu {
    /* position: relative; */
    top: 0.2rem;
    left: 0.2rem;
}
</style>