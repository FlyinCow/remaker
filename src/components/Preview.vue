<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { unified } from 'unified';
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkRehype from 'remark-rehype'
import rehypeDomStringfy from 'rehype-dom-stringify'
import rehypeStringfy from 'rehype-stringify'
import rehypeMathjax from 'rehype-mathjax'
import rehypeHighLight from 'rehype-highlight'
import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown.css'

import { useNoteStore } from '../store';
import { storeToRefs } from 'pinia';
import { visit } from 'unist-util-visit';

const { currentNote } = storeToRefs(useNoteStore())

const processor = unified()
    .data('settings', { fragment: true })
    .use(remarkParse)
    // .use(remarkGfm)
    // .use(remarkMath)
    .use(remarkRehype)
    // .use(rehypeMathjax)
    .use(rehypeHighLight)
    .use(rehypeDomStringfy)

// const md = computed(() => {
//     return processor.processSync(notes.value.get(currentNote.value)!.content).toString()
// })

const md = computed(() => {
    return processor.processSync(currentNote.value ? currentNote.value.content : '').toString()
})

</script>

<template>
    <div v-html="md" class="preview markdown-body"></div>
</template>

<style scoped>
.preview {
    flex-grow: 1;
    height: 100%;
    min-width: 50%;
    box-sizing: border-box;
    padding: 16px;
}

.preview:deep(*) {
    width: 100%;
    word-wrap: break-word;
    word-break: break-all;
}
</style>

<style>
pre {
    box-sizing: border-box;
}
</style>