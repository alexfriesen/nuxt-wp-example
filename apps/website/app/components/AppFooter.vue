<template>
    <footer
        class="bg-background/75 backdrop-blur border-t -mb-px z-50 border-neutral-200 dark:border-neutral-800 min-h-12"
        :class="$attrs.class">
        <nav
            class="max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between py-1 lg:gap-3 h-16">
            <div class="lg:order-1 flex items-center gap-1.5">
                <UButton v-for="menu of wpMenu" :key="menu.to" :to="menu.to" variant="link">
                    {{ menu.label }}
                </UButton>
            </div>

            <div class="lg:order-0">
                <span class="copyleft">&copy;</span> Nuxt WP Example
            </div>
        </nav>
    </footer>
</template>

<script setup lang="ts">
const { data: wpNav } = await useAsyncData('footer-menu', () => $fetch('/api/wp/nav/footer'));
const wpMenu = computed(() => {
    return wpNav.value?.map(item => ({
        label: item.label,
        to: item.uri,
    }))
    return [];
});
</script>

<style scoped>
.copyleft {
    display: inline-block;
    transform: rotate(180deg);
}
</style>