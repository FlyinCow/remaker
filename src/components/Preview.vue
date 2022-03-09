<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { unified } from 'unified';
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeDomStringfy from 'rehype-dom-stringify'
import 'github-markdown-css/github-markdown.css'

import { useCurrentNote } from '../store';

const content = useCurrentNote()

const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeDomStringfy)

const md = computed(() => {
    return processor.processSync(content.content).toString()
})


</script>

<template>
    <div v-html="md" class="preview markdown-body"></div>
</template>

<style scoped>
.preview {
    flex-grow: 1;
    height: 100%;
    width: 50%;
}

.preview:deep(*) {
    width: 100%;
    word-wrap: break-word;
    word-break: break-all;
}
</style>