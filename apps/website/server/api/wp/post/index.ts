import { z } from 'zod';
import type { PaginatedPostsQuery } from '#build/graphql-operations';
import { useGraphqlFetch } from '~~/server/utils/wp-graphql';

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(
    event,
    z.object({
      first: z.coerce
        .number()
        .int()
        .positive()
        .lte(50)
        .nullable()
        .default(null),
      after: z.string().nullable().default(null),
      last: z.coerce.number().int().positive().lte(50).nullable().default(null),
      before: z.string().nullable().default(null),
    }).safeParse
  );

  if (!query.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid request queries',
    });
  }

  const { first, last, after, before } = query.data;

  const { data, errors } = await useGraphqlFetch<PaginatedPostsQuery>(event, {
    query: 'PaginatedPosts',
    params: { first, last, after, before },
  });

  if (errors) {
    console.error('Error', errors);
    return [];
  }

  return {
    pagination: data.posts?.pageInfo,
    items: data?.posts?.edges?.map((edge) => edge.node) ?? [],
  };
});
