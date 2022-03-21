<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { Directive, onBeforeUpdate, ref, watch, watchEffect, Ref, StyleValue, reactive, onMounted, onUnmounted } from 'vue';
import { useNoteStore } from '../store';
import { Note } from '../store'
import { vClickOutside } from '../directives'
// import { RouterLink } from 'vue-router'

// display notes
const noteStore = useNoteStore()
const { currentNote, tags } = storeToRefs(noteStore)
const notetree = ref<{
  [tag: string]: {
    collapsed: boolean,
    notes: Note[]
  }
}>({});

watchEffect(() => {
  [undefined, ...tags.value].forEach(tag => {
    notetree.value[tag ? tag : 'untagged'] = ({
      collapsed: false,
      notes: noteStore.getTag(tag)
    })
  })
})


// create note
const newNoteName = ref('')
const showNewNote = ref(false)

function onNewNote() {
  if (newNoteName.value !== '')
    noteStore.newNote(newNoteName.value)
  showNewNote.value = false
}
const newNoteNameRef = ref<HTMLInputElement | null>(null)

const vAutofocusAndSelect = {
  mounted: (el: HTMLInputElement) => {
    el.focus()
    el.select()
  }
}

// right-click menu
const showContextmenu = ref(false)
const contextmenuPostion = ref<{ x: string, y: string }>({ x: '0', y: '0' })
const noteRefs = ref<{
  [title: string]: Ref<HTMLAnchorElement | null>
}>({})

onBeforeUpdate(() => {
  noteRefs.value = {}
})

const rigthClickedNoteTitle = ref<string>()

function onRightclickNote(e: MouseEvent, notetitle: string) {
  rigthClickedNoteTitle.value = notetitle
  showContextmenu.value = true
  contextmenuPostion.value = {
    x: `${e.clientX}px`,
    y: `${e.clientY}px`
  }
}

function closeContextmenuHandler() {
  showContextmenu.value = false
}

onMounted(() => {
  document.addEventListener('click', closeContextmenuHandler)
  document.addEventListener('contextmenu', closeContextmenuHandler)
})

onUnmounted(() => {
  document.removeEventListener('click', closeContextmenuHandler)
  document.removeEventListener('contextmenu', closeContextmenuHandler)
})

function onClickDeleteNote() {
  noteStore.deleteNote(rigthClickedNoteTitle.value)
}

function onClickRenameNote() {

}


</script>

<template>
  <ul class="note-tree">
    <ul class="toolbar">
      <span class="material-icons icon icon-search">search</span>
      <span class="material-icons icon icon-filter_list">filter_list</span>
      <span class="material-icons icon icon-note_add" @click="showNewNote = !showNewNote;">note_add</span>
    </ul>
    <ul>
      <input
        type="text"
        v-model="newNoteName"
        placeholder="new note name"
        @keyup.enter="onNewNote"
        @keydown.escape="showNewNote = !showNewNote"
        ref="newNoteNameRef"
        v-if="showNewNote"
        v-autofocus-and-select="1"
      />
    </ul>
    <ul class="tags">
      <ul class="contextmenu" ref="contextmenu" v-show="showContextmenu">
        <li class="contextmenu-item" @click="onClickRenameNote">rename</li>
        <li class="contextmenu-item" @click="onClickDeleteNote">delete</li>
      </ul>
      <li v-for="folder, tag in notetree" :key="tag">
        <a class="tag-container" @click="folder.collapsed = !folder.collapsed">
          <span class="material-icons icon icon-fold-arrow">
            {{
              folder.collapsed ? "expand_more" : "expand_less"
            }}
          </span>
          <span class="tag">#{{ tag }}</span>
        </a>
        <ul class="notes" v-show="!folder.collapsed">
          <!-- <RouterLink v-for="note in folder.notes" :to="`/note/${note.title}`" custom> -->
          <li v-for="note in folder.notes" :key="note.title">
            <a
              class="note-container"
              :class="note.title == currentNote?.title ? `current` : ''"
              @click="noteStore.setCurrentNote(note.title)"
              :ref="el => { if (el) noteRefs[note.title] = el as HTMLAnchorElement }"
              @contextmenu.prevent.capture.stop="(e) => onRightclickNote(e, note.title)"
            >
              <span class="material-icons icon icon-file">insert_drive_file</span>
              <span class="note">{{ note.title }}</span>
            </a>
            <!-- <ul class="note-contextmenu">
              <li class="note-contextmenu-item">rename</li>
              <li class="note-contextmenu-item">delete</li>
            </ul>-->
          </li>
          <!-- </RouterLink> -->
        </ul>
      </li>
    </ul>
  </ul>
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
.icon,
.contextmenu-item {
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

.contextmenu {
  position: fixed;
  left: v-bind("contextmenuPostion.x");
  top: v-bind("contextmenuPostion.y");
  background-color: #464b50;
  color: #bcbcbc;
}

.contextmenu-item {
}
</style>