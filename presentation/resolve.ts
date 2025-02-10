import { capitalCase } from 'change-case';
import { get, mapValues } from 'lodash';
import { titleCase } from 'title-case';

function createTypeResolver<P extends string, K extends string>(
  path: P,
  {
    filter,
    select,
    locations,
  }: {
    filter: string;
    select: Record<K, string>;
    locations: (
      value: any,
      href: (doc?: any) => string
    ) => {
      title: string;
      href: string;
    }[];
  }
) {
  const mappedData = (doc: any) =>
    mapValues(select, (val) => {
      const _val = get(doc, val);
      if (_val === undefined || _val === null) return null;
      return String(_val);
    });

  const href: (doc?: any) => string = (doc) => {
    const mapped = mappedData(doc);
    let p: string = path;
    for (const [key, val] of Object.entries(mapped)) {
      p = p.replaceAll(`[${key}]`, String(val));
    }
    return p;
  };

  return {
    locations: (doc: any) => {
      const items = locations(doc, href);
      if (!items.length) return null;
      return items;
    },
    document: {
      route: path.replace(/\[(.*?)\]/g, ':$1'),
      filter,
    },
    href,
  };
}

function createSlugTypeResolver<T extends string, P extends string>(
  type: T,
  path: P,
  index?: string
) {
  return createTypeResolver(`/${path as string}/[slug]`, {
    filter: `_type == "${type}" && slug.current == $slug`,
    select: {
      slug: 'slug.current',
    },
    locations(doc, href) {
      return (
        (doc?.slug && [
          {
            title: doc?.name || doc?.title || 'Untitled',
            href: href(doc),
          },
          ...(index !== undefined
            ? [
                {
                  title: `${titleCase(capitalCase(type))} index`,
                  href: `/${index}`,
                },
              ]
            : []),
        ]) ||
        []
      );
    },
  });
}

const project = createSlugTypeResolver('project', 'projects', '');
const album = createSlugTypeResolver('album', 'albums', 'albums');

export const resolve = { project, album };
