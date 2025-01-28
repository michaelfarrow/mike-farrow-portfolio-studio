import { PreviewProps } from 'sanity';
import { Flex, Badge } from '@sanity/ui';
import { DocumentIcon } from '@sanity/icons';

import { capitalCase } from 'change-case';
import { isValidElementType } from 'react-is';

export const DocumentPreview = (props: PreviewProps) => {
  const { renderDefault, schemaType } = props;

  const Icon = schemaType?.icon;
  const type =
    schemaType?.title || (schemaType?.name && capitalCase(schemaType?.name));

  return renderDefault({
    ...props,
    status:
      (type && (
        <Badge padding={2}>
          <Flex>
            <span style={{ paddingRight: 7, transform: 'scale(0.90)' }}>
              {(isValidElementType(Icon) && <Icon />) || <DocumentIcon />}
            </span>
            {type}
          </Flex>
        </Badge>
      )) ||
      undefined,
  });
};
