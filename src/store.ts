import { defineStore } from "pinia";

export interface Note {
	title: string
	content: string
	tags: Set<string>
}

export const useCurrentNote = defineStore('currentNote', {
	state: (): Note => ({
		title: 'untitled',
		content: '',
		tags: new Set<string>()
	}),
})


export const useNoteStore = defineStore('documentTree', {
	state: () => ({
		notes: new Map<string, Note>()
	}),
	getters: {
		all: state => [...state.notes.values()],
		getTag() {
			return (tag: string) => this.all.filter(note => [...note.tags].includes(tag))
		},
		tags() {
			let tags = new Set<string>()
			this.all.map(note => note.tags.forEach(tag => tags.add(tag)))
			return tags
		}
	},
	actions: {
		addNote(note: Note) {
			this.notes.set(note.title, note)
		}
	}
})