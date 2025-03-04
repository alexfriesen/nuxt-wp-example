<template>
    <div>
        <AppHeader />

        <main class="min-h-[var(--main-height)] relative">
            <slot />
        </main>

        <AppFooter />
    </div>
</template>

<style>
:root {
    --header-height: 65px;
    --footer-height: 75px;
    --main-height: calc(100vh - var(--header-height) - var(--footer-height));
}
</style>