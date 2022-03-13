<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useNoteStore } from '../store';
import { Note } from '../store'
// import { RouterLink } from 'vue-router'

const noteStore = useNoteStore()
const { currentNote, tags } = storeToRefs(noteStore)
reactive(Array<{
  tag: string,
  collapsed: boolean
  notes: Note[]
}>());

const notetree = ref([...tags.value.values()].map(tag =>
({
  tag: tag,
  collapsed: false,
  notes: noteStore.getTag(tag)
})))

notetree.value.push({
  tag: 'untaged',
  collapsed: false,
  notes: noteStore.getTag()
})


</script>

<template>
  <div class="note-tree">
    <div class="toolbar">
      <span class="material-icons icon icon-search">search</span>
      <span class="material-icons icon icon-filter_list">filter_list</span>
      <span class="material-icons icon icon-note_add">note_add</span>
    </div>
    <ul class="tags">
      <li v-for="folder in notetree" :key="folder.tag">
        <a class="tag-container" @click="folder.collapsed = !folder.collapsed">
          <span class="material-icons icon icon-fold-arrow">
            {{
              folder.collapsed ? "expand_more" : "expand_less"
            }}
          </span>
          <span class="tag">#{{ folder.tag }}</span>
        </a>
        <ul class="notes" v-show="!folder.collapsed">
          <!-- <RouterLink v-for="note in folder.notes" :to="`/note/${note.title}`" custom> -->
          <li
            v-for="note in folder.notes"
            :key="note.title"
            @click="noteStore.setCurrentNote(note.title)"
          >
            <a class="note-container" :class="note.title == currentNote?.title ? `current` : ''">
              <span class="material-icons icon icon-file">insert_drive_file</span>
              <span class="note">{{ note.title }}</span>
            </a>
          </li>
          <!-- </RouterLink> -->
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

li a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #bcbcbc;
}

.tag {
  font-size: 18px;
}

.icon {
  font-size: 20px;
}

.note-tree {
  overflow: auto;
  height: 100vh;
}

.note-container {
  padding-left: 1.5rem;
}

.note-container:hover,
.tag-container:hover,
.current {
  background-color: #464b50;
}

.icon {
  font-size: 18px;
}

.tag,
.note,
.icon {
  line-height: 1.2rem;
  color: #bcbcbc;
  user-select: none;
}
.tag,
.note {
  font-family: "Fira Mono", sans-serif;
}
</style>