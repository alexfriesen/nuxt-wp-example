<template>
    <div :class="$attrs.class">
        <UNavigationMenu :items="menu" orientation="horizontal" content-orientation="vertical"
            class="hidden md:flex justify-evenly" />
        <UButton class="md:hidden" icon="i-lucide-menu" variant="ghost" @click="openMoreMenu = true" />

        <USlideover v-model:open="openMoreMenu" title="Menu" side="right">
            <template #body>
                <div class="flex flex-col justify-center h-full">
                    <UNavigationMenu :items="menu" orientation="vertical" class="full-w" />
                </div>
            </template>
        </USlideover>
    </div>
</template>

<script setup lang="ts">
const openMoreMenu = ref(false);

const route = useRoute();
watch(() => route.path, () => {
    openMoreMenu.value = false;
});

const { data: wpNav } = await useAsyncData('main-menu', () => $fetch('/api/wp/nav/main'));
const wpMenu = computed(() => {
    return wpNav.value?.map(item => ({
        label: item.label,
        to: item.uri,
    }))
});
const menu = computed(() => [
    wpMenu.value
]);
</script>