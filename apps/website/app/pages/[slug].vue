<script setup lang="ts">

const route = useRoute()

definePageMeta({
    validate: async (route) => {
        // Check if the id is made up of digits
        return typeof route.params.slug === 'string'
    }
})

const slug = route.params.slug as string;

const { status, data } = await useAsyncData(`page/${slug}`, () => $fetch(`/api/wp/page/${slug}`));

useSeoMeta({
    title: data.value?.title,
    // description: data.value?.seo.metaDesc,

    // robots: {
    //     follow: data.value?.seo.follow === 'follow',
    //     nofollow: data.value?.seo.nofollow === 'nofollow',
    //     index: data.value?.seo.index === 'index',
    //     noindex: data.value?.seo.noindex === 'noindex',
    // },

    // ogType: data.value?.seo.opengraphType,
    // ogTitle: data.value?.seo.opengraphTitle,
    // ogDescription: data.value?.seo.opengraphDescription,
    // ogSiteName: data.value?.seo.opengraphSiteName,

    // twitterTitle: data.value?.seo.twitterTitle,
    // twitterDescription: data.value?.seo.twitterDescription,
})
</script>

<template>
    <UContainer class="flex flex-col h-full py-4">
        <article class="prose dark:prose-invert lg:prose-xl">
            <h2>{{ data?.title }}</h2>
            <div v-sanitize="data?.content"></div>
        </article>
    </UContainer>
</template>
