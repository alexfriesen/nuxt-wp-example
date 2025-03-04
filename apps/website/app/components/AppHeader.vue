<script setup lang="ts">
</script>

<template>
    <header :class="$attrs.class"
        class="bg-(--ui-bg)/75 backdrop-blur border-b border-(--ui-border) h-(--ui-header-height) sticky top-0 z-50">
        <nav class="max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8  flex items-center justify-between gap-3 h-16">
            <UButton to="/" variant="link">
                Nuxt WP Example
            </UButton>

            <AppNavigation />
        </nav>
    </header>
</template>