import { defineStore, storeToRefs } from "pinia";
import { computed, Ref, ref } from "vue";
export interface Note {
	title: string
	content: string
	tags: Set<string>
};


export const useNoteStore = defineStore('documentTree', () => {
	// init from localstorage
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

	// current note
	const currentNote = ref<Note>({
		title: '',
		content: '',
		tags: new Set()
	})

	function setCurrentNote(title: string) {
		let cur = notes.value.get(title)
		if (cur)
			currentNote.value = cur
	}

	// filters
	const all = computed(() => [...notes.value.values()])

	const tags = computed(() => new Set(
		all.value
			.map(note => [...note.tags])
			.reduce((pre, current) => pre.concat(current), [])
	))

	function getTag(tag?: string) {
		return all.value.filter(note => tag ? [...note.tags].includes(tag) : note.tags.size === 0)
	}

	function has(title: string) { return notes.value.has(title) }

	const newNote = (title?: string) => {
		title = title || 'new note'
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

	function deleteNote(title?: string) {
		if (!title || !has(title)) return
		notes.value.delete(title)
	}

	function renameNote() {
	}


	function toObject() {
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
		deleteNote,
		renameNote,
		toObject
	}
});