<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';
import { useNoteStore } from '../store';
import { Note } from '../store'
// import { RouterLink } from 'vue-router'

const noteStore = useNoteStore()
const { currentNote, tags } = storeToRefs(noteStore)

const notetree = ref(Array<{
  tag: string,
  collapsed: boolean
  notes: Note[]
}>());

watchEffect(() => {
  notetree.value.push({
    tag: 'untagged',
    collapsed: false,
    notes: noteStore.getTag()
  })
  tags.value.forEach(tag => {
    notetree.value.push({
      tag: tag,
      collapsed: false,
      notes: noteStore.getTag(tag)
    })
  })
})



const newNoteName = ref('')
const showNewNote = ref(false)

const onNewNote = () => {
  // alert(newNoteName.value)
  console.log(newNoteName.value)
  noteStore.newNote(newNoteName.value)
  showNewNote.value = false
}
const newFileInput = ref<HTMLInputElement | null>(null)

const foucusNewNoteInput = () => {
  console.log(newFileInput.value)
  newFileInput.value?.focus()

}

onMounted(() => {
  watch(showNewNote, () => {
    foucusNewNoteInput()
  })
})

</script>

<template>
  <div class="note-tree">
    <div class="toolbar">
      <span class="material-icons icon icon-search">search</span>
      <span class="material-icons icon icon-filter_list">filter_list</span>
      <span class="material-icons icon icon-note_add" @click="showNewNote = !showNewNote;">note_add</span>
    </div>
    <div>
      <input
        type="text"
        v-model="newNoteName"
        @keyup.enter="onNewNote"
        v-show="showNewNote"
        ref="newFileInput"
      />
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

li > a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #bcbcbc;
}

.tag,
.icon {
  font-size: 18px;
}

.tag,
.note {
  font-family: "Fira Mono", sans-serif;
}

.tag,
.note,
.icon {
  line-height: 1.2rem;
  color: #bcbcbc;
  user-select: none;
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
.current,
.toolbar {
  background-color: #464b50;
}

.toolbar {
  width: 100%;
}

.toolbar > .icon {
  font-size: 24px;
  border-radius: 4px;
}

.toolbar > .icon:hover {
  background-color: #323537;
}
</style>