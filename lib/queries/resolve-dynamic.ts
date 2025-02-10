import { defineQuery } from 'groq';

const commonDocument = `
  _type,
  slug,
  name,
  title
`;

export const resolveDynamicQuery = defineQuery(`
  {
    'document': *[_id==$id][0]{
      ${commonDocument}
    },
    'references': *[
      references($id)
      && !(_id in path("drafts.**"))
      && length(string::split(_type, ".")) == 1
    ] {
      ${commonDocument}
    },
  }
`);

export const resolveDynamicQueryDeep = defineQuery(`
  {
    'document': *[_id==$id][0]{
      ${commonDocument}
    },
    'references': *[
      references(
        $id,
        *[references($id)]._id
      )
      && !(_id in path("drafts.**"))
      && length(string::split(_type, ".")) == 1
    ] {
      ${commonDocument}
    },
  }
`);
