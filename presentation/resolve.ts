import { capitalCase } from 'change-case';
import { titleCase } from 'title-case';

export declare type DocumentLocationResolverObject<K extends string = string> =
  {
    select: Record<K, string>;
    resolve: (value: Record<K, any> | null) => {
      locatons: {
        title: string;
        href: string;
      }[];
    };
  };

export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

type TypesFromString<T extends string> =
  T extends `${string}[${infer X}]${infer tail}`
    ? Simplify<{ [key in X]: string } & TypesFromString<tail>>
    : // eslint-disable-next-line typescript/no-empty-object-type
      {};

function createTypeResolver<
  P extends string,
  K extends string,
  Params extends Record<string, string> = TypesFromString<P>,
>(
  path: P,
  {
    filter,
    select,
    locations,
  }: {
    filter: string;
    select: Record<K, string>;
    locations: (
      value: Record<K, any> | null,
      generateLink: (params?: Params | null) => string
    ) => {
      title: string;
      href: string;
    }[];
  }
) {
  const generateLink: (params?: Params | null) => string = (params) => {
    let p: string = path;
    for (const [key, val] of Object.entries(params || {})) {
      p = p.replaceAll(`[${key}]`, val);
    }
    return p;
  };

  return {
    select,
    resolve: (doc: any) => ({
      locations: locations(doc, generateLink),
    }),
    document: {
      route: path.replace(/\[(.*?)\]/g, ':$1'),
      filter,
    },
    generateLink,
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
      name: 'name',
      slug: 'slug.current',
    },
    locations(doc, generateLink) {
      return [
        {
          title: doc?.name || 'Untitled',
          href: generateLink(doc),
        },
        ...(index
          ? [
              {
                title: `${titleCase(capitalCase(type))} index`,
                href: `/${index}`,
              },
            ]
          : []),
      ];
    },
  });
}

const project = createSlugTypeResolver('project', 'projects', '');
const album = createSlugTypeResolver('album', 'albums', 'albums');

export const resolve = { project, album };
