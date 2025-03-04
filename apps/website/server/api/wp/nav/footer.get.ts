import { useGraphqlFetch } from '~~/server/utils/wp-graphql';
import type { MenuQuery } from '#graphql-operations';

export default defineEventHandler(async (event) => {
  const { data, errors } = await useGraphqlFetch<MenuQuery>(event, {
    query: 'Menu',
    params: { name: 'footer' },
  });

  if (errors) {
    console.error('Failed to fetch menu', errors);
    return [];
  }

  return data?.menu?.menuItems?.nodes || [];
});
