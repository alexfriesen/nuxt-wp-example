export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    'nuxt-graphql-middleware',
    '@radya/nuxt-dompurify',
  ],
  css: ['~/assets/css/main.css'],
  graphqlMiddleware: {
    graphqlEndpoint: 'http://localhost:8080/graphql',
    downloadSchema: false,
    codegenConfig: {
      skipTypename: true,
      useTypeImports: true,
      // inlineFragmentTypes: 'combine',
      dedupeFragments: true,
      onlyOperationTypes: true,
      avoidOptionals: false,
      maybeValue: 'T | undefined',
      namingConvention: {
        enumValues: 'change-case-all#upperCaseFirst',
      },
    },
    codegenSchemaConfig: {
      urlSchemaOptions: {
        headers: {
          Authorization: 'server-token',
        },
      },
    },
    outputDocuments: true,
    autoImportPatterns: ['~~/queries/*.gql'],
    includeComposables: true,
    devtools: true,
  },
  devtools: { enabled: true },
});
