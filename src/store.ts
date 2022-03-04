import { defineStore } from "pinia";

interface Note {
    title: string
    tags: string[]
    lines: string[]
}

const noteOption = {
    state: (): Note => ({
        title: 'untitled',
        lines: [''],
        tags: []
    }),
    getters: {
        content: (state: Note): string => {
            return state.lines.join('\n')
        }
    }
}

export const useNote = (title: string) => {
    return defineStore(`doc:${title}`, noteOption)
}

export const useCurrentNote = defineStore('doc:$current', noteOption)


export const useNotePool = defineStore('documentTree', {
    state: () => ({
        notes: Array<Note>()
    }),
    getters: {
        getTag: state => (tag: string) => state.notes.filter((note) => note.tags.includes(tag)),
        all: state => state.notes.map((note) => useNote(note.title))
    }
})


// for test
export const useTestStore = defineStore('test', {
    state: () => ({
        data: Array<string>()
    }),
    getters: {
        content: (state): string => {
            return state.data.join('\n')
        }
    }
})