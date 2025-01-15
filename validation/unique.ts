import { CustomValidator } from 'sanity';
import groq from 'groq';
import { STUDIO_CONFIG } from '@/lib/env';

export const unique: CustomValidator<any | undefined> = async (
  value,
  context
) => {
  const { document, path, getClient } = context;

  if (!value || !document || !path || !path.length) return true;

  const client = getClient(STUDIO_CONFIG);
  const pathJoined = path.join('.');
  const id = document._id.replace(/^drafts\./, '');

  const params = {
    type: document._type,
    draft: `drafts.${id}`,
    published: id,
    value,
  };

  const query = groq`
    !defined(*[
      _type == $type &&
      !(_id in [$draft, $published]) &&
      ${pathJoined} == $value
    ][0]._id)
  `;

  const isUnique = await client.fetch(query, params);
  if (!isUnique) return 'Unique value required';

  return true;
};
