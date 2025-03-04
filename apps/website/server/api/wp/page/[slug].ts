import { z } from 'zod';

import { useGraphqlFetch } from '~~/server/utils/wp-graphql';
import type { NodeByUriQuery } from '#graphql-operations';

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(
    event,
    z.object({
      slug: z.string(),
    }).safeParse
  );

  if (!params.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid request params',
    });
  }

  const { data, errors } = await useGraphqlFetch<NodeByUriQuery>(event, {
    query: 'NodeByUri',
    params: { uri: params.data.slug },
  });

  if (errors) {
    console.error('Error', errors);
    return [];
  }

  return data?.nodeByUri;
});
