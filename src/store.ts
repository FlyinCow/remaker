import { defineStore, storeToRefs } from "pinia";
import { computed, Ref, ref } from "vue";
export interface Note {
	title: string
	content: string
	tags: Set<string>
};


export const useNoteStore = defineStore('documentTree', () => {
	const local = localStorage.getItem('notes')
	let _notes = new Map<string, Note>()
	if (local) {
		let _notesobj = JSON.parse(local)
		for (let title in _notesobj) {
			_notes.set(title, {
				title: title,
				content: _notesobj[title]['content'],
				tags: new Set<string>(_notesobj[title]['tags'])
			})
		}
	}
	const notes = ref<Map<string, Note>>(_notes)

	const currentNote = ref<Note>({
		title: '',
		content: '',
		tags: new Set()
	})
	const setCurrentNote = (title: string) => {
		let cur = notes.value.get(title)
		if (cur)
			currentNote.value = cur
	}

	const all = computed(() => [...notes.value.values()])

	const tags = computed(() => new Set(
		all.value
			.map(note => [...note.tags])
			.reduce((pre, current) => pre.concat(current), [])
	)
	)
	const getTag = (tag?: string) => all.value.filter(note => tag ? [...note.tags].includes(tag) : note.tags.size == 0)
	const has = (title: string) => notes.value.has(title)

	const newNote = (title: string) => {
		if (has(title)) {
			title = title + '(new)'
			newNote(title)
		}
		else {
			notes.value.set(title, {
				title: title,
				content: '',
				tags: new Set()
			})
		}
	}

	const deleteNote = (title: string) => {

	}
	const toObject = () => {
		let obj = {} as {
			[title: string]: {
				title: string,
				content: string,
				tags: string[]
			},
		}
		notes.value.forEach((note, title) => {
			obj[title] = {
				title: note.title,
				content: note.content,
				tags: [...note.tags.values()]
			}
		})
		return obj
	}

	return {
		notes,
		currentNote,
		setCurrentNote,
		all,
		tags,
		getTag,
		has,
		newNote,
		toObject
	}
});