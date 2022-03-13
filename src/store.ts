import { assert } from "console";
import { defineStore, storeToRefs } from "pinia";
import { computed, Ref, ref } from "vue";

export interface Note {
	title: string
	content: string
	tags: Set<string>
};


export const useNoteStore = defineStore('documentTree', () => {
	const notes = ref(new Map<string, Note>())

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
	const has = notes.value.has

	const newNote = (title: string) => {
		if (has(title)) {
			title = 'new-' + title
			newNote(title)
		}
		notes.value.set(title, {
			title: title,
			content: '',
			tags: new Set()
		})
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
	}
});
