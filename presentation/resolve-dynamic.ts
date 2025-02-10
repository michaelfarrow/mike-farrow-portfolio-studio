import { Observable, map } from 'rxjs';

import { type ClientReturn } from '@sanity/client';
import { getDraftId } from 'sanity';
import { DocumentLocationResolver } from 'sanity/presentation';

import { resolveDynamicQuery } from '@/lib/queries/resolve-dynamic';
import { resolve } from '@/presentation/resolve';

export const resolveDynamic: DocumentLocationResolver = (params, context) => {
  const { id, type } = params;

  const resolver: (typeof resolve)[keyof typeof resolve] | undefined =
    (resolve as any)[type] || undefined;

  const query = {
    fetch: resolveDynamicQuery,
    listen: `*[_id in [$id,$draftId]]`,
  };

  const doc$ = context.documentStore.listenQuery(
    query,
    { id, draftId: getDraftId(id) },
    { perspective: 'previewDrafts' }
  ) as Observable<ClientReturn<typeof resolveDynamicQuery>>;

  return doc$.pipe(
    map((res) => {
      const mainLocations =
        (res.document?.slug?.current && resolver?.locations(res.document)) ||
        [];

      const references = res.references
        .map((doc: any) => {
          const resolver: (typeof resolve)[keyof typeof resolve] =
            resolve[doc._type as keyof typeof resolve];

          if (!resolver) return null;

          return resolver.locations(doc)?.[0] || null;
        })
        .filter((item) => !!item);

      const locations = [...mainLocations, ...references];

      if (!locations.length) return null;

      return {
        locations,
      };
    })
  );
};
