import { map } from 'rxjs';

import { getDraftId } from 'sanity';
import { DocumentLocationResolver } from 'sanity/presentation';

import { resolve } from '@/presentation/resolve';

export const resolveDynamic: DocumentLocationResolver = (params, context) => {
  const { id, type } = params;

  const resolver: (typeof resolve)[keyof typeof resolve] | undefined =
    resolve[type as keyof typeof resolve];

  if (resolver) {
    const query = {
      fetch: `*[_id==$id][0]{...}`,
      listen: `*[_id in [$id,$draftId]]`,
    };

    const doc$ = context.documentStore.listenQuery(
      query,
      { id, draftId: getDraftId(id) },
      { perspective: 'previewDrafts' }
    );

    return doc$.pipe(
      map((doc) => {
        if (!doc || !doc.slug?.current) {
          return null;
        }
        return {
          locations: resolver.locations(doc),
        };
      })
    );
  }

  const query = {
    fetch: `*[
      references($id)
      && !(_id in path("drafts.**"))
      && length(string::split(_type, ".")) == 1
    ] {
      ...
    }`,
    listen: `*[_id in [$id,$draftId]]`,
  };

  const doc$ = context.documentStore.listenQuery(
    query,
    { id, draftId: getDraftId(id) },
    { perspective: 'previewDrafts' }
  );

  return doc$.pipe(
    map((docs) => {
      if (!docs.length) return null;

      const locations = docs
        .map((doc: any) => {
          const resolver: (typeof resolve)[keyof typeof resolve] | undefined =
            resolve[doc._type as keyof typeof resolve];

          if (!resolver) return null;

          return resolver.locations(doc)?.[0];
        })
        .filter(Boolean);

      if (!locations.length) return null;

      return {
        locations,
      };
    })
  );
};
