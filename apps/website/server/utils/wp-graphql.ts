import type { H3Event } from 'h3';
import type { GraphqlServerResponse } from '#graphql-middleware/types';

export function useGraphqlFetch<T>(
  event: H3Event,
  { query, params }: { query: string; params?: Record<string, unknown> }
) {
  return $fetch<GraphqlServerResponse<T>>(
    `/api/graphql_middleware/query/${query}`,
    {
      method: 'GET',
      params: buildRequestParams(params),
      body: undefined,
      headers: {
        Authorization: `Bearer ${event.context.accessToken}`,
      },
    }
  );
}

export function buildRequestParams(
  variables?: Record<string, unknown> | undefined | null
): Record<string, unknown> {
  if (!variables) {
    return {};
  }
  for (const key in variables) {
    if (typeof variables[key] !== 'string') {
      return {
        __variables: JSON.stringify(variables),
      };
    }
  }

  return variables;
}
