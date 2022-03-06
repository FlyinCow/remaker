<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useNoteStore } from '../store';
import { Note } from '../store'

const notesStore = useNoteStore()
const raw_notes = [{
    title: 'note1',
    lines: [''],
    tags: ['tag1', 'tag2']
}, {
    title: 'note2',
    lines: [''],
    tags: ['tag2']
}, {
    title: 'note3',
    lines: [''],
    tags: []
}]

raw_notes.map(note => notesStore.notes.set(note.title, {
    title: note.title,
    lines: note.lines,
    tags: new Set(note.tags)
}))

const tags = notesStore.tags
const notetree = reactive(Array<{
    tag: string,
    collapsed: boolean
    notes: Note[]
}>());
[...tags.values()].map(tag => {
    notetree.push({
        tag: tag,
        collapsed: false,
        notes: notesStore.getTag(tag)
    })
})

</script>

<template>
    <div class="note-tree">
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
                    <li v-for="note in folder.notes">
                        <a class="note-container">
                            <span class="material-icons icon icon-file">insert_drive_file</span>
                            <span class="note">{{ note.title }}</span>
                        </a>
                    </li>
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

.tag-container {
    padding-left: 1.5em;
}

.note-container {
    padding-left: 3rem;
}

.note-container:hover,
.tag-container:hover {
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