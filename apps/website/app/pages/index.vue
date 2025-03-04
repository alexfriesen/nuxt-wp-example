<script setup lang="ts">

const limit = 6

const pagination = ref<{
    first?: number, after?: string, last?: number, before?: string
}>({
    first: limit,
    after: undefined,
    last: undefined,
    before: undefined
});
const { data } = useAsyncData('posts', () => $fetch('/api/wp/post', {
    query: pagination.value
}), {
    watch: [pagination],
});

const items = computed(() => data.value?.items || []);
const pageInfo = computed(() => data.value?.pagination || {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: undefined,
    endCursor: undefined
});

function nextPage() {
    pagination.value = {
        first: limit,
        after: pageInfo.value.endCursor || undefined,
        last: undefined,
        before: undefined
    }
}
function previousPage() {
    pagination.value = {
        first: undefined,
        after: undefined,
        last: limit,
        before: pageInfo.value.startCursor || undefined
    }
}
</script>

<template>
    <UContainer class="flex flex-col h-full">
        <h2 class="text-2xl font-bold">Posts</h2>
        <section class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

            <UCard v-for="post in items" :key="post.id">
                <h2 class="text-xl">{{ post.title }}</h2>
                <div v-sanitize="post.excerpt" class="text-sm text-"></div>

                <template #footer>
                    <div class="flex items-center justify-between">
                        <span class="text-sm">{{ new Date(post.dateGmt).toLocaleString() }}</span>

                        <UButton :to="post.uri">
                            Read more
                        </UButton>
                    </div>

                </template>
            </UCard>
        </section>

        <div class="flex justify-between my-4">
            <UButton :disabled="!data?.pagination?.hasPreviousPage" @click="previousPage">
                Previous
            </UButton>
            <UButton :disabled="!data?.pagination?.hasNextPage" @click="nextPage">
                Next
            </UButton>
        </div>
    </UContainer>
</template>
